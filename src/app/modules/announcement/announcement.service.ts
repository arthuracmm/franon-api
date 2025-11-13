import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Announcement } from './announcement.model';
import { User } from '../users/user.model';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectModel(Announcement)
    private readonly announcementModel: typeof Announcement,
  ) { }

  async create(data: Partial<Announcement>): Promise<Announcement> {
    return this.announcementModel.create(data as any);
  }

  async findAll(): Promise<Announcement[]> {
    return this.announcementModel.findAll(
      {
        include: [
          {
            model: User,
            attributes: ['telephoneNumber', 'email', 'profileImage'],
          },
        ],
      });
  }

  async findOne(id: string): Promise<Announcement> {
    const announcement = await this.announcementModel.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['telephoneNumber', 'email', 'profileImage'],
        },
      ],
    });

    if (!announcement) {
      throw new NotFoundException('Anúncio não encontrado');
    }

    return announcement;
  }


  async findByUserId(userId: number): Promise<Announcement[]> {
    return this.announcementModel.findAll({
      where: { userId },
    });
  }

  async update(id: string, data: Partial<Announcement>): Promise<Announcement> {
    const announcement = await this.findOne(id);
    return announcement.update(data);
  }

  async remove(id: string): Promise<void> {
    const announcement = await this.findOne(id);
    await announcement.destroy();
  }
}
