import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from '@prisma/client';

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
    const task = await this.prisma.item.findUnique({
      where: {
        id: id,
      },
    });
    if (!task) throw new ForbiddenException('更新できません');

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
