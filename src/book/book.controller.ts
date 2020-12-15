import {
  Controller,
  Get,
  Post,
  Body,
  Header,
  Put,
  Param,
  Delete,
} from '@nestjs/common'
import { BookService } from './book.service'
import { CreateBookDto } from './dto/create-book.dto'
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger'
import { Book } from './entities/book.entity'
import { UpdateBookDto } from './dto/update-book.dto'

@ApiBearerAuth()
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

  @Put(':id')
  @ApiResponse({
    status: 200,
    type: Book,
    description: 'The book updated successfully.',
  })
  update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto)
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: Number, description: 'Id of deleted book' })
  async remove(@Param('id') id: number) {
    await this.bookService.remove(id)
    return id
  }
}
