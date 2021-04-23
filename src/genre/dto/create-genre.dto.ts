import { ApiProperty } from '@nestjs/swagger'

export class CreateGenreDto {
  @ApiProperty({ description: 'Name of genre' })
  readonly type: string
}
