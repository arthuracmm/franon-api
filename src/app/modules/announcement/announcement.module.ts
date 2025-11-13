import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { Announcement } from './announcement.model';
import { User } from '../users/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Announcement, User])],
  controllers: [AnnouncementController],
  providers: [AnnouncementService],
})
export class AnnouncementModule {}
