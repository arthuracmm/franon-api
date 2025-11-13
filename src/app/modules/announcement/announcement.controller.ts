import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { Announcement } from './announcement.model';

@ApiTags('announcement')
@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementeService: AnnouncementService) { }

  @Post()
  @ApiOperation({ summary: 'Criar um novo anúncio de vaga' })
  async create(@Body() dto: CreateAnnouncementDto) {
    return this.announcementeService.create(dto as any);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os anúncios' })
  async findAll() {
    return this.announcementeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um anúncio por ID' })
  async findOne(@Param('id') id: string) {
    return this.announcementeService.findOne(id);
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: number): Promise<Announcement[]> {
    return this.announcementeService.findByUserId(userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um anúncio por ID' })
  async update(@Param('id') id: string, @Body() dto: UpdateAnnouncementDto) {
    return this.announcementeService.update(id, dto as any);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um anúncio por ID' })
  async remove(@Param('id') id: string) {
    await this.announcementeService.remove(id);
    return { deleted: id };
  }
}
