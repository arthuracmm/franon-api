import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { User } from '../users/user.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
