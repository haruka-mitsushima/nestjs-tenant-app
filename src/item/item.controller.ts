import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Item } from '@prisma/client';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  @Get()
  async getItems(): Promise<Item[]> {
    return await this.itemService.getItems();
  }

  @Post()
  async createItem(@Body() dto: CreateItemDto): Promise<Item> {
    return await this.itemService.createItem(dto);
  }

  @Post(':id')
  async updateItemById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateItemDto,
  ): Promise<Item> {
    return await this.itemService.updateItemById(dto, id);
  }
}
