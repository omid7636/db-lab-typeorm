import { Module } from '@nestjs/common'
import { TodoService } from './services/todo.service'
import { TodoController } from './controllers/todo.controller'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { TagService } from './services/tag.service'
import { CategoryService } from './services/category.service'
import { UserModule } from '../user/user.module'
import { ItemService } from './services/item.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { Todo } from './entities/todo.entity'
import { Item } from './entities/item.entity'
import { Tag } from './entities/tag.entity'
import { ItemController } from './controllers/item.controller'

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Tag, Item, Category, Todo])],
  controllers: [TodoController, ItemController],
  providers: [
    TodoService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    TagService,
    CategoryService,
    ItemService,
  ],
})
export class TodoModule {}
