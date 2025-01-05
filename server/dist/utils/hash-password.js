"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
function hashPassword(password) {
    try {
        return bcrypt.hash(password, 10);
    }
    catch (error) {
        throw new common_1.InternalServerErrorException();
    }
}
//# sourceMappingURL=hash-password.js.map