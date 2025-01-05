import { ProductOutputDto } from './dtos/product.dto';
import { ProductService } from './products.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getProduct(params: PagenationOption): Promise<ProductOutputDto>;
    getProductByCategory(params: PagenationOption, categoryID: number): Promise<ProductOutputDto>;
    searchProduct(params: PagenationOption): Promise<ProductOutputDto>;
}
