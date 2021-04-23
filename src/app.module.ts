import { Module } from '@nestjs/common'
import { HelloModule } from './hello/hello.module'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user/entities/user.entity'
import { AuthModule } from './auth/auth.module'
import { TodoModule } from './todo/todo.module'
import { Tag } from './todo/entities/tag.entity'
import { Todo } from './todo/entities/todo.entity'
import { Item } from './todo/entities/item.entity'
import { Category } from './todo/entities/category.entity'

@Module({
  imports: [
    HelloModule,
    UserModule,
    TypeOrmModule.forFeature([User, Tag, Todo, Item, Category]),
    TypeOrmModule.forRoot(),
    AuthModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
