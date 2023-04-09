import { Book, BookImage } from '@/models/index';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BookAddDto } from './dto/BookControllerDto';

@ApiTags('book')
@Controller('book')
export class BookController {
  bookRepo: Repository<Book>;
  bookImageRepo: Repository<BookImage>;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.bookRepo = this.dataSource.getRepository(Book);
    this.bookImageRepo = this.dataSource.getRepository(BookImage);
  }

  @Get('list')
  async books() {
    const books = await this.bookRepo.find({ order: { createdAt: 'DESC' } });
    const count = await this.bookRepo.count();
    return {
      count,
      books,
    };
  }

  @Get(':id/detail')
  async bookDetail(@Param('id') id: string) {
    const book = await this.bookRepo.findOne({
      where: { id },
      relations: ['images'],
    });
    if (!book) throw new HttpException('NOT_FOUND_BOOK', 404);
    return book;
  }

  @Post('create')
  async createBook(@Body() data: BookAddDto) {
    const book = this.bookRepo.create({
      title: data.title,
      context: data.context,
      coverImage: data.coverImage,
    });

    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(book);
      const images = data.images.map((el) =>
        this.bookImageRepo.create({
          url: el,
          book,
        }),
      );
      await queryRunner.manager.save(images);
      await queryRunner.commitTransaction();
      return book;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new HttpException('Server error', 500);
    }
  }
}
