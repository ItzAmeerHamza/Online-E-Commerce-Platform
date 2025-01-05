import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductOutputDto } from './dtos/product.dto';
export declare class ProductService {
    private products;
    constructor(products: Repository<Product>);
    findAll(params: PagenationOption): Promise<ProductOutputDto>;
    findAllByCategory(categoryId: number, params: PagenationOption): Promise<ProductOutputDto>;
    searchByName(params: PagenationOption): Promise<ProductOutputDto>;
}
