import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateBudgetRequestDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsString()
  project: string;
}
