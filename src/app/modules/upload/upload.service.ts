import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/user.model';

@Injectable()
export class UploadService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async updateUserLogo(userId: number, filename: string) {
    const user = await this.userModel.findByPk(userId);
    if (!user) return null;
    const filePath = `/uploads/logos/${filename}`;
    await user.update({ profileImage: filePath });
    return filePath;
  }
}
