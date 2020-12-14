import { Injectable } from '@nestjs/common'
import { CreateGenreDto } from './dto/create-genre.dto'
import { Genre } from './entities/genre.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const genre = new Genre()
    genre.type = createGenreDto.type
    return this.genreRepository.save(genre)
  }

  findAll(): Promise<Genre[]> {
    return this.genreRepository.find()
  }
}
