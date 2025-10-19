import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { resolve } from 'path';

@Injectable()
export class UploadService {
  constructor(@InjectModel(User) private userModel: typeof User) { }

  async updateUserLogo(userId: number, filename: string) {
    const user = await this.userModel.findByPk(userId);
    if (!user) return null;

    const newFilePath = `/uploads/logos/${filename}`;

    const oldFilename = user.profileImage?.split('/').pop();

    if (oldFilename) {
      const oldFilePath = join(__dirname, '..', '..', '..', '..', 'uploads', 'logos', oldFilename);

      try {
        await unlink(oldFilePath);
      } catch (err: any) {
        if (err.code !== 'ENOENT') {
          console.error(`Erro ao remover imagem antiga: ${err.message}`);
        }
      }
    }

    await user.update({ profileImage: newFilePath });

    return newFilePath;
  }

  async deleteUserLogo(userId: number): Promise<boolean> {
    const user = await this.userModel.findByPk(userId);
    if (!user || !user.profileImage) return false;

    const filename = user.profileImage.split('/').pop();
    if (!filename) return false;

    const filePath = resolve(process.cwd(), 'uploads', 'logos', filename);

    try {
      await unlink(filePath);
    } catch (err: any) {
      if (err.code !== 'ENOENT') {
        console.error(`Erro ao deletar imagem: ${err.message}`);
      }
    }

    await user.update({ profileImage: null });
    return true;
  }
}
