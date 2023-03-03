import { Book } from "../models";
import { Controller, Get, HttpException, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";

@ApiTags("book")
@Controller("book")
export class BookController {
  bookRepo: Repository<Book>
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.bookRepo = this.dataSource.getRepository(Book);
  }

  @Get("list")
  async books() {
    const books = await this.bookRepo.find({ order: { createdAt: "DESC" } });
    const count = await this.bookRepo.count();
    return {
      count,
      books
    }
  }

  @Get(":id/detail")
  async bookDetail(@Param("id") id: string) {
    const book = await this.bookRepo.findOne({
      where: { id },
      relations: ["images"]
    });
    if (!book) throw new HttpException("NOT_FOUND_BOOK", 404);
    return book
  }
}