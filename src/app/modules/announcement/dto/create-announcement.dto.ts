import { IsString, IsOptional, IsBoolean, IsDateString, IsArray, IsNumber } from 'class-validator';

export class CreateAnnouncementDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  companyName: string;

  @IsString()
  location: string;

  @IsString()
  workModel: string;

  @IsString()
  jobType: string;

  @IsOptional()
  @IsString()
  salary?: string;

  @IsOptional()
  @IsString()
  salaryRange?: string;

  @IsOptional()
  @IsDateString()
  applicationDeadline?: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  benefits?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  responsibilities?: string[];

  @IsOptional()
  @IsString()
  applyLink?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  workload?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  schedule?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsNumber()
  userId: number;
}
