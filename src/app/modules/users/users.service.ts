import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
  ) { }

  async createUser(data: Partial<User>): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password!, 10);
    return this.userModel.create({
      ...data,
      isEmployer: false,
      password: hashedPassword,
    } as User);
  }

  async createEmployer(data: Partial<User>): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password!, 10);
    return this.userModel.create({
      ...data,
      isEmployer: true,
      password: hashedPassword,
    } as User);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findByPk(id, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findEmployers(): Promise<User[]> {
    const employers = await this.userModel.findAll({
      where: { isEmployer: true },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });

    if (!employers || employers.length === 0) {
      throw new NotFoundException('Nenhum empregador encontrado');
    }

    return employers;
  }


  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
    });
  }


  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    return user.update(data);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
