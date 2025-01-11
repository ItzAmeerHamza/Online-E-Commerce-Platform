import { HttpStatus } from '@nestjs/common';
import { ProductOutputDto } from './dtos/product.dto';
import { ProductService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getProduct(params: PagenationOption): Promise<ProductOutputDto>;
    createProduct(data: CreateProductDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/product.entity").Product;
    }>;
    readProduct(id: string): Promise<{
        statusCode: HttpStatus;
        data: import("./entities/product.entity").Product;
    }>;
    uppdateProduct(id: string, data: UpdateProductDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/product.entity").Product;
    }>;
    deleteProduct(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    getProductByCategory(params: PagenationOption, categoryID: number): Promise<ProductOutputDto>;
    searchProduct(params: PagenationOption): Promise<ProductOutputDto>;
}
