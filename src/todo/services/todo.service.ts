import { Injectable } from '@nestjs/common'
import { CreateTodoDto } from '../dto/create-todo.dto'
import { UpdateTodoDto } from '../dto/update-todo.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Todo } from '../entities/todo.entity'
import { ItemService } from './item.service'
import { CategoryService } from './category.service'
import { UserService } from '../../user/user.service'
import { TagService } from './tag.service'

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    private readonly itemService: ItemService,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
    private readonly tagService: TagService,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: number) {
    const { description, category, items = [], tags } = createTodoDto

    const todo = new Todo()
    todo.description = description
    todo.items = await this.itemService.createAll(items)
    todo.category = await this.categoryService.create(category)
    todo.user = await this.userService.findById(userId)
    todo.tags = await this.tagService.createAll(tags)

    return this.todoRepository.save(todo)
  }

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find({
      relations: ['user', 'tags', 'category', 'items', 'items.category'],
    })
  }

  findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne(id, {
      relations: ['user', 'tags', 'category', 'items', 'items.category'],
    })
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
    userId: number,
  ): Promise<Todo> | never {
    const { tags, items = [], category, description } = updateTodoDto

    const todo = await this.todoRepository.findOne(id, { relations: ['user'] })
    if (todo.user.id !== userId) throw new Error('Unauthorised')

    if (description) todo.description = description
    if (items) todo.items = await this.itemService.createAll(items)
    if (category) todo.category = await this.categoryService.create(category)
    if (tags) todo.tags = await this.tagService.createAll(tags)

    return this.todoRepository.save(todo)
  }

  async remove(id: number, userId: number): Promise<Todo> | never {
    const todo = await this.todoRepository.findOne(id, { relations: ['user'] })
    if (todo.user.id !== userId) throw new Error('Unauthorised')
    return this.todoRepository.remove(todo)
  }
}
