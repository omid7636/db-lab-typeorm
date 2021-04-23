import { ApiProperty } from '@nestjs/swagger'

export class CreateBookDto {
  @ApiProperty({ description: 'Name of book' })
  readonly name: string

  @ApiProperty({ description: "User id of book's owner" })
  readonly userId: number

  @ApiProperty({ description: 'Ids of book genres' })
  readonly genreIds: number[]
}
