import { CoreEntity } from 'src/common/entities/core.entity';
import { Product } from './product.entity';
export declare class ProductCategory extends CoreEntity {
    name: String;
    products: Product[];
}
