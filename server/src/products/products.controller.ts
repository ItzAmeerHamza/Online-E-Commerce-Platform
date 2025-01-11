import {
  Controller,
  Get,
  Param,
  Query,
  Body,
  Post,
  Patch,
  Delete,
  HttpStatus 
 } from '@nestjs/common';
import { ProductOutputDto } from './dtos/product.dto';
import { ProductService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  async getProduct(
    @Query() params: PagenationOption,
  ): Promise<ProductOutputDto> {
    return this.productService.findAll(params);
  }

  @Post()
  async createProduct(@Body() data: CreateProductDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Product added successfully',
      data: await this.productService.createProduct(data),
    };
  }

  @Get(':id')
  async readProduct(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.productService.removeProduct(id),
    };
  }

  @Patch(':id')
  async uppdateProduct(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Product update successfully',
      data: await this.productService.updateProduct(id, data),
    };
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    await this.productService.removeProduct(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product deleted successfully',
    };
  }

  @Get(':id(\\d+)')
  async getProductByCategory(
    @Query() params: PagenationOption,
    @Param('id') categoryID: number,
  ): Promise<ProductOutputDto> {
    return this.productService.findAllByCategory(categoryID, params);
  }

  @Get('search')
  async searchProduct(
    @Query() params: PagenationOption,
  ): Promise<ProductOutputDto> {
    return this.productService.searchByName(params);
  }
}