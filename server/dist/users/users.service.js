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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.jwtsecret = 'JWTSECRET';
    }
    async signup(createuserdto) {
        const { email, password, phone, address, firstName, lastName, age } = createuserdto;
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new common_1.BadRequestException('Username already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({
            email,
            password: hashedPassword,
            phone,
            address,
            firstName,
            lastName,
            age
        });
        return this.userRepository.save(newUser);
    }
    async login(loginuserdto) {
        const { email, password } = loginuserdto;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { email: user.email, userid: user.userId };
        const accessToken = await this.jwtService.signAsync(payload);
        return { user, accessToken };
    }
    async validateToken(token) {
        try {
            const decoded = jwt.verify(token, this.jwtsecret);
            return decoded;
        }
        catch (err) {
            return null;
        }
    }
    async findById(userId) {
        const user = await this.userRepository.findOne({ where: { userId } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId}} not found`);
        }
        return user;
    }
    async deleteUserById(userId) {
        const result = await this.userRepository.delete(userId);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found.`);
        }
    }
    async findAll() {
        return await this.userRepository.find();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=users.service.js.map