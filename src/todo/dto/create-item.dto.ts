import { Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateItemDto {
  @Length(0, 1000)
  @ApiProperty({
    description: 'Enter Description of Item',
    minLength: 1,
    maxLength: 1000,
  })
  description: string

  @Length(3, 20)
  @ApiProperty({ description: 'Category of item' })
  category: string
}
