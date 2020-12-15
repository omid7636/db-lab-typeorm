import { Controller, Get, Post, Body, Param, Header } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger'
import { Book } from '../book/entities/book.entity'
import { User } from './entities/user.entity'
import { Public } from '../auth/decorators/public.decorator'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @Header('Content-Type', 'application/json')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @ApiBearerAuth()
  @Get()
  @ApiResponse({ status: 200, type: [User] })
  findAll() {
    return this.userService.findAll()
  }

  @ApiBearerAuth()
  @Get(':id/book')
  @ApiResponse({ status: 200, type: [Book] })
  findOne(@Param('id') id: number) {
    return this.userService.findUserBooks(id)
  }
}
