import { IsOptional, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { CreateItemDto } from './create-item.dto'

export class CreateTodoDto {
  @IsOptional()
  @Length(0, 1000)
  @ApiProperty({
    description: 'Enter Description of Task',
    minLength: 0,
    maxLength: 1000,
  })
  description: string

  @IsOptional()
  @ApiProperty({
    description: 'Items of Task',
    type: [CreateItemDto],
  })
  items: CreateItemDto[]

  @Length(3, 20)
  @ApiProperty({ description: 'Category of Task' })
  category: string

  @ApiProperty({ description: 'Tags of Task', type: [String] })
  tags: string[]
}
