import { Controller, Get, Post, Body, Header } from '@nestjs/common'
import { GenreService } from './genre.service'
import { CreateGenreDto } from './dto/create-genre.dto'
import { ApiResponse } from '@nestjs/swagger'
import { Genre } from './entities/genre.entity'

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  @ApiResponse({
    status: 201,
    description: 'The genre has been successfully created.',
    type: Genre,
  })
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto)
  }

  @Get()
  @ApiResponse({ status: 200, type: [Genre] })
  findAll() {
    return this.genreService.findAll()
  }
}
