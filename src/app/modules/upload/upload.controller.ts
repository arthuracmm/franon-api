import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  Delete,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadService } from './upload.service';
import { ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('logo')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/logos',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 2 * 1024 * 1024 },
    }),
  )
  async uploadLogo(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    const userId = req.user?.id;
    if (!userId) return { error: 'Usuário não autenticado' };

    const path = await this.uploadService.updateUserLogo(userId, file.filename);
    return { path };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('logo')
  async deleteLogo(@Req() req, @Res() res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' });

    const deleted = await this.uploadService.deleteUserLogo(userId);

    if (!deleted) {
      return res.status(404).json({ error: 'Nenhuma imagem para remover.' });
    }

    return res.status(200).json({ message: 'Logo removida com sucesso.' });
  }
}
