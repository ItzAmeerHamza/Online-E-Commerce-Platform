import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductOutputDto } from './dtos/product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
export declare class ProductService {
    private products;
    constructor(products: Repository<Product>);
    createProduct(createproductdto: CreateProductDto): Promise<Product>;
    updateProduct(productId: string, updateProductDto: UpdateProductDto): Promise<Product>;
    removeProduct(id: string): Promise<Product>;
    findProductById(productId: string): Promise<Product>;
    findAll(params: PagenationOption): Promise<ProductOutputDto>;
    findAllByCategory(categoryId: number, params: PagenationOption): Promise<ProductOutputDto>;
    searchByName(params: PagenationOption): Promise<ProductOutputDto>;
}
