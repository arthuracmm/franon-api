import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('logo')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/logos',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 2 * 1024 * 1024 }, 
    }),
  )
  async uploadLogo(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const userId = req.user?.id;
    if (!userId) return { error: 'Usuário não autenticado' };
    const path = await this.uploadService.updateUserLogo(userId, file.filename);
    return { path };
  }
}
