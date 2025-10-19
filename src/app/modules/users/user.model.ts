import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare id: number;

  @ApiProperty()
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare isEmployer: boolean;

  @ApiProperty()
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ApiProperty()
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @ApiProperty()
  @Column({ type: DataType.STRING, allowNull: true })
  declare telephoneNumber: string;

  @ApiProperty()
  @Column({ type: DataType.STRING, allowNull: true })
  declare cpf: string;

  @ApiProperty()
  @Column({ type: DataType.STRING, allowNull: true })
  declare cnpj: string;

  @ApiProperty()
  @Column({ type: DataType.STRING, allowNull: true })
  declare cep: string;

  @ApiProperty()
  @Column({ type: DataType.STRING, allowNull: true })
  declare adress: string;

  @ApiProperty()
  @Column({ type: DataType.STRING, allowNull: true })
  declare adressNumber: string;

  @ApiProperty()
  @Column({ type: DataType.STRING, allowNull: true })
  declare complement: string;

  @ApiProperty()
  @Column({ type: DataType.STRING, allowNull: true })
  declare neighborhood: string;

  @ApiProperty()
  @Column({ type: DataType.STRING, allowNull: true })
  declare city: string;

  @ApiProperty()
  @Column({ type: DataType.STRING, allowNull: true })
  declare state: string;

  @ApiProperty()
  @Column({ type: DataType.STRING, allowNull: true })
  declare profileImage: string | null;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;
}
