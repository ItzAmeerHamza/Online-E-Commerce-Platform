import { IsEmail, IsNotEmpty } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ProductCategory } from '../entities/product-category.entity';

export class CreateProductDto extends CoreOutput {

  id : string;

  @IsNotEmpty()
  name: String;

  description: String;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  quantity: number;

//   category: ProductCategory;
}