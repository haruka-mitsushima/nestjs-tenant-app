import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Item } from '@prisma/client';
import { CreateItemDto } from './dto/create-item.dto';
import { DeleteItemDto } from './dto/delete-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemService } from './item.service';

@Controller('api/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  @Get()
  async getItems(): Promise<Item[]> {
    return await this.itemService.getItems();
  }

  @Get(':id')
  async getItemById(@Param('id', ParseIntPipe) id: number): Promise<Item> {
    return await this.itemService.getItemById(id);
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

  @Patch('delete/:id')
  async deleteItemById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DeleteItemDto,
  ): Promise<Item> {
    return await this.itemService.deleteItemById(dto, id);
  }
}
