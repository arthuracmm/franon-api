import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    UploadModule
  ],
  exports: [
    UsersModule,
    AuthModule,
    UploadModule
  ],
})
export class IndexModule { }