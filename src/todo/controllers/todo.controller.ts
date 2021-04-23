import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  Delete,
  Post,
  Header,
  Req,
  UnauthorizedException,
} from '@nestjs/common'
import { TodoService } from '../services/todo.service'
import { UpdateTodoDto } from '../dto/update-todo.dto'
import {
  ApiBearerAuth,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { Todo } from '../entities/todo.entity'
import { CreateTodoDto } from '../dto/create-todo.dto'

@ApiBearerAuth()
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  @ApiResponse({
    status: 201,
    description: 'The Todo has been successfully created.',
    type: Todo,
  })
  create(@Body() createTodoDto: CreateTodoDto, @Req() req) {
    return this.todoService.create(createTodoDto, req.user.userId)
  }

  @Get()
  @ApiResponse({ status: 200, type: [Todo] })
  findAll() {
    return this.todoService.findAll()
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Todo })
  findOne(@Param('id') id: number) {
    return this.todoService.findOne(id)
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, type: Todo })
  @ApiUnauthorizedResponse()
  update(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req,
  ) {
    try {
      return this.todoService.update(id, updateTodoDto, req.user.userId)
    } catch (e) {
      throw new UnauthorizedException()
    }
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: Number })
  @ApiUnauthorizedResponse()
  async remove(@Param('id') id: number, @Req() req) {
    try {
      await this.todoService.remove(id, req.user.userId)
      return id
    } catch (e) {
      throw new UnauthorizedException()
    }
  }
}
