import { Injectable } from '@nestjs/common'
import { CreateBookDto } from './dto/create-book.dto'
import { Book } from './entities/book.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../user/entities/user.entity'
import { Repository } from 'typeorm'
import { Genre } from '../genre/entities/genre.entity'
import { UpdateBookDto } from './dto/update-book.dto'

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { name, userId, genreIds } = createBookDto

    const book = new Book()
    book.name = name
    book.user = await this.usersRepository.findOne(userId)
    book.genres = await this.genreRepository.findByIds(genreIds)
    return this.bookRepository.save(book)
  }

  findAll(): Promise<Book[]> {
    return this.bookRepository.find()
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const { userId, name, genreIds } = updateBookDto

    const partialEntry = {
      ...(name && { name }),
      ...(userId && { user: await this.usersRepository.findOne(userId) }),
      ...(genreIds && {
        genres: await this.genreRepository.findByIds(genreIds),
      }),
    }

    await this.bookRepository.update({ id }, partialEntry)

    return this.bookRepository.findOne(id)
  }

  async remove(id: number) {
    await this.bookRepository.delete(id)
  }
}
