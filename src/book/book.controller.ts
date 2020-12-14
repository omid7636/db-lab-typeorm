import { Controller, Get, Post, Body, Header } from '@nestjs/common'
import { BookService } from './book.service'
import { CreateBookDto } from './dto/create-book.dto'
import { ApiResponse } from '@nestjs/swagger'
import { Book } from './entities/book.entity'

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
    type: Book,
  })
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto)
  }

  @Get()
  @ApiResponse({ status: 200, type: [Book] })
  findAll() {
    return this.bookService.findAll()
  }
}
