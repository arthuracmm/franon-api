import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../users/user.model';

@Table({ tableName: 'announcement' })
export class Announcement extends Model<Announcement> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column(DataType.TEXT)
  declare description: string;

  @Column(DataType.STRING)
  declare companyName: string;
  
  @Column(DataType.STRING)
  declare location: string;

  @Column(DataType.STRING)
  declare workModel: string;

  @Column(DataType.STRING)
  declare jobType: string;

  @Column(DataType.STRING)
  declare salary: string;

  @Column(DataType.STRING)
  declare salaryRange: string;

  @Column(DataType.DATE)
  declare applicationDeadline: Date;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  })
  declare benefits: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  })
  declare requirements: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  })
  declare responsibilities: string[];

  @Column(DataType.STRING)
  declare applyLink: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  })
  declare workload: string[];

 @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  })
  declare schedule: string[];

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare isActive: boolean;

  @ForeignKey(() => User)
  @Column
  declare userId: number;

  @Column({
    type: DataType.STRING
  })
  declare bannerColor: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare allowWhatsapp: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare allowEmail: boolean;

  @BelongsTo(() => User)
  user: User;
}
