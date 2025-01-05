import { CoreOutput } from 'src/common/dtos/output.dto';
import { Product } from '../entities/product.entity';
export declare class ProductOutputDto extends CoreOutput {
    products?: Product[];
}
