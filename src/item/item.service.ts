import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from '@prisma/client';
import { DeleteItemDto } from './dto/delete-item.dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) { }

  async createItem(dto: CreateItemDto): Promise<Item> {
    return await this.prisma.item.create({
      data: {
        ...dto,
      },
    });
  }

  async getItems(): Promise<Item[]> {
    return await this.prisma.item.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async updateItemById(dto: UpdateItemDto, id: number): Promise<Item> {
    const item = await this.prisma.item.findUnique({
      where: {
        id: id,
      },
    });
    if (!item) throw new ForbiddenException('更新できません');

    return this.prisma.item.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteItemById(dto: DeleteItemDto, id: number): Promise<Item> {
    const item = await this.prisma.item.findUnique({
      where: {
        id: id,
      },
    });
    if (!item) throw new ForbiddenException('更新できません');

    return this.prisma.item.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
  }
}
