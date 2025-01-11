import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductOutputDto } from './dtos/product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private products: Repository<Product>,
  ) {}

  async createProduct(createproductdto: CreateProductDto): Promise<Product> {
    const { name, description, price, quantity } = createproductdto
    const newProduct = this.products.create({
      name,
      description,
      price,
      quantity
    });

    return await this.products.save(newProduct);
  }

  async updateProduct(productId: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.products.preload({
      id: +productId,
      ...updateProductDto,
    })
    if(!product) {
      throw new NotFoundException(`Product ${productId} not found`)
    }
    return this.products.save(product)
  }

  async removeProduct(id: string): Promise<Product> {
    const product = await this.findProductById(id)
    return this.products.remove(product)
  }

  async findProductById(productId: string): Promise<Product> {
    const user = await this.products.findOne({ where: {productId} });
    if (!user) {
      throw new NotFoundException(`Product with ID ${productId}} not found`);
    }
    return user;
  }

  async findAll(params: PagenationOption): Promise<ProductOutputDto> {
    try {
      const products = await this.products
        .createQueryBuilder('product')
        .orderBy('product.id', 'ASC')
        .offset(params.offset)
        .limit(params.limit)
        .getMany();

      return { success: true, products };
    } catch (error) {
      return { success: false, error: 'Unknown error has occurred.' };
    }
  }

  async findAllByCategory(
    categoryId: number,
    params: PagenationOption,
  ): Promise<ProductOutputDto> {
    try {
      const products = await this.products
        .createQueryBuilder('product')
        .where('product.categoryId = :categoryId', { categoryId })
        .orderBy('product.id', 'ASC')
        .offset(params.offset)
        .limit(params.limit)
        .getMany();

      return { success: true, products };
    } catch (error) {
      return { success: false, error: 'Unknown error has occurred.' };
    }
  }

  async searchByName(params: PagenationOption): Promise<ProductOutputDto> {
    try {
      const products = await this.products
        .createQueryBuilder('product')
        .where('product.name like :search', { search: `%${params.search}%` })
        .orderBy('product.id', 'ASC')
        .offset(params.offset)
        .limit(params.limit)
        .getMany();

      return { success: true, products };
    } catch (error) {
      return { success: false, error: 'Unknown error has occurred.' };
    }
  }
}