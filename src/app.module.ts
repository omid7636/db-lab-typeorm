import { Module } from '@nestjs/common'
import { HelloModule } from './hello/hello.module'
import { GenreModule } from './genre/genre.module'
import { BookModule } from './book/book.module'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user/entities/user.entity'
import { Book } from './book/entities/book.entity'
import { Genre } from './genre/entities/genre.entity'

@Module({
  imports: [
    HelloModule,
    GenreModule,
    BookModule,
    UserModule,
    TypeOrmModule.forFeature([User, Book, Genre]),
    TypeOrmModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
