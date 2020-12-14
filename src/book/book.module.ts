import { Module } from '@nestjs/common'
import { BookService } from './book.service'
import { BookController } from './book.controller'
import { UserModule } from '../user/user.module'
import { GenreModule } from '../genre/genre.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Book } from './entities/book.entity'

@Module({
  imports: [UserModule, GenreModule, TypeOrmModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
