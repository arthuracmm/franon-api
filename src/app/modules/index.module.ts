import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { AnnouncementModule } from './announcement/announcement.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    UploadModule,
    AnnouncementModule
  ],
  exports: [
    UsersModule,
    AuthModule,
    UploadModule,
    AnnouncementModule
  ],
})
export class IndexModule { }