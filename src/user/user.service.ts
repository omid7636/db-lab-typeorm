import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Todo } from '../todo/entities/todo.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, password, username } = createUserDto
    const user = new User()
    user.name = name
    user.username = username
    user.password = password
    return this.usersRepository.save(user)
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ select: ['name', 'username', 'id'] })
  }

  async findUserTodos(id: number): Promise<Todo[]> {
    const { todos } = await this.usersRepository.findOne(id, {
      relations: [
        'todos',
        'todos.tags',
        'todos.category',
        'todos.items',
        'todos.items.category',
      ],
    })
    return todos
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ username })
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findOne(id)
  }
}
