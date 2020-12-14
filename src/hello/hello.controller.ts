import { Controller, Get, Post, Body, Header, Query } from '@nestjs/common'
import { HelloService } from './hello.service'
import { PersonDto } from './dto/person.dto'
import { ApiQuery, ApiResponse } from '@nestjs/swagger'

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Post('welcome')
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 201, description: 'Say Hello!!!' })
  async sayWelcome(@Body() personDto: PersonDto): Promise<{ data: String }> {
    const data = await this.helloService.welcome(personDto)
    return { data }
  }

  @Get('welcome')
  @ApiResponse({ status: 200 })
  @ApiQuery({
    name: 'name',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'year',
    required: false,
    type: Number,
    description: `you can ignore this`,
  })
  async sayWelcome2(
    @Query('name') name,
    @Query('year') year,
  ): Promise<{ data: String }> {
    const data = await this.helloService.welcome({ name, year })
    return { data }
  }
}
