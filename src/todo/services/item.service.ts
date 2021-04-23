import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Item } from '../entities/item.entity'
import { CreateItemDto } from '../dto/create-item.dto'
import { CategoryService } from './category.service'
import { UpdateItemDto } from '../dto/update-item.dto'

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    private readonly categoryService: CategoryService,
  ) {}

  async createAll(createItemDtos: CreateItemDto[]): Promise<Item[]> {
    const items = await Promise.all(
      createItemDtos.map(async ({ description, category }) => {
        const item = new Item()
        item.description = description
        item.category = await this.categoryService.create(category)
        return item
      }),
    )
    return this.itemRepository.save(items)
  }

  async update(
    id: number,
    updateItemDto: UpdateItemDto,
    userId: any,
  ): Promise<Item> | never {
    const { description, category } = updateItemDto
    const item = await this.itemRepository.findOne(id, {
      relations: ['todo', 'todo.user'],
    })
    if (item.todo.user.id !== userId) throw new Error('Unauthorised')

    if (description) item.description = description
    if (category) item.category = await this.categoryService.create(category)

    return this.itemRepository.save(item)
  }

  async remove(id: number, userId: any): Promise<Item> | never {
    const item = await this.itemRepository.findOne(id, {
      relations: ['todo', 'todo.user'],
    })
    if (item.todo.user.id !== userId) throw new Error('Unauthorised')

    return this.itemRepository.remove(item)
  }
}
