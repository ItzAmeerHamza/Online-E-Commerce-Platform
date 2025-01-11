import { CoreEntity } from 'src/common/entities/core.entity';
import { ProductCategory } from './product-category.entity';
export declare class Product extends CoreEntity {
    productId: String;
    name: String;
    description: String;
    price: number;
    quantity: number;
    category: ProductCategory;
}
