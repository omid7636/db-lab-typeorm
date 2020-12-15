import {
  Controller,
  Body,
  Put,
  Param,
  Delete,
  Req,
  Header,
  UnauthorizedException,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { ItemService } from '../services/item.service'
import { UpdateItemDto } from '../dto/update-item.dto'
import { Item } from '../entities/item.entity'

@ApiBearerAuth()
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Put(':id')
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, type: Item })
  @ApiUnauthorizedResponse()
  update(
    @Param('id') id: number,
    @Body() updateItemDto: UpdateItemDto,
    @Req() req,
  ) {
    try {
      return this.itemService.update(id, updateItemDto, req.user.userId)
    } catch (e) {
      throw new UnauthorizedException()
    }
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: Number })
  @ApiUnauthorizedResponse()
  async remove(@Param('id') id: number, @Req() req) {
    try {
      await this.itemService.remove(id, req.user.userId)
      return id
    } catch (e) {
      throw new UnauthorizedException()
    }
  }
}
