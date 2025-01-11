import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class CreateProductDto extends CoreOutput {
    id: string;
    name: String;
    description: String;
    price: number;
    quantity: number;
}
