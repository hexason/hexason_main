import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book, BookImage } from './models';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookImage])],
  controllers: [BookController],
})
export class BookModule {}
