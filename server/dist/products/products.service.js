"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
let ProductService = class ProductService {
    constructor(products) {
        this.products = products;
    }
    async createProduct(createproductdto) {
        const { name, description, price, quantity } = createproductdto;
        const newProduct = this.products.create({
            name,
            description,
            price,
            quantity
        });
        return await this.products.save(newProduct);
    }
    async updateProduct(productId, updateProductDto) {
        const product = await this.products.preload({
            id: +productId,
            ...updateProductDto,
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product ${productId} not found`);
        }
        return this.products.save(product);
    }
    async removeProduct(id) {
        const product = await this.findProductById(id);
        return this.products.remove(product);
    }
    async findProductById(productId) {
        const user = await this.products.findOne({ where: { productId } });
        if (!user) {
            throw new common_1.NotFoundException(`Product with ID ${productId}} not found`);
        }
        return user;
    }
    async findAll(params) {
        try {
            const products = await this.products
                .createQueryBuilder('product')
                .orderBy('product.id', 'ASC')
                .offset(params.offset)
                .limit(params.limit)
                .getMany();
            return { success: true, products };
        }
        catch (error) {
            return { success: false, error: 'Unknown error has occurred.' };
        }
    }
    async findAllByCategory(categoryId, params) {
        try {
            const products = await this.products
                .createQueryBuilder('product')
                .where('product.categoryId = :categoryId', { categoryId })
                .orderBy('product.id', 'ASC')
                .offset(params.offset)
                .limit(params.limit)
                .getMany();
            return { success: true, products };
        }
        catch (error) {
            return { success: false, error: 'Unknown error has occurred.' };
        }
    }
    async searchByName(params) {
        try {
            const products = await this.products
                .createQueryBuilder('product')
                .where('product.name like :search', { search: `%${params.search}%` })
                .orderBy('product.id', 'ASC')
                .offset(params.offset)
                .limit(params.limit)
                .getMany();
            return { success: true, products };
        }
        catch (error) {
            return { success: false, error: 'Unknown error has occurred.' };
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ProductService);
//# sourceMappingURL=products.service.js.map