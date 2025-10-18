import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';
import { CreateEmployerDto } from './dto/createEmployer.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Criar um novo colaborador' })
  @ApiResponse({ status: 201, description: 'colaborador criado com sucesso.' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('employer')
  @ApiOperation({ summary: 'Criar um novo empregador' })
  @ApiResponse({ status: 201, description: 'Empregador criado com sucesso.' })
  async createEmployer(@Body() createEmployerDto: CreateEmployerDto) {
    return this.usersService.createEmployer(createEmployerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('employers')
  @ApiOperation({ summary: 'Listar todos os empregadores' })
  async findAllEmployers() {
    return this.usersService.findEmployers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um usuário pelo ID' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um usuário pelo ID' })
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return { deleted: id };
  }
}
