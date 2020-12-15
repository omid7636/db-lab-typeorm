import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Tag } from '../entities/tag.entity'

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  async createAll(tagNames: string[]): Promise<Tag[]> {
    const tags = tagNames.map(name => {
      const tag = new Tag()
      tag.name = name
      return tag
    })
    return this.tagRepository.save(tags)
  }
}
