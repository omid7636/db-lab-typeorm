import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ description: 'Name of user' })
  readonly name: string

  @ApiProperty({ description: 'Username of user' })
  readonly username: string

  @ApiProperty({ description: 'Password of user' })
  readonly password: string
}
