import { PartialType } from '@nestjs/mapped-types';
import { CartDto } from './cart.dto';

export class UpdateCartDto extends PartialType(CartDto) {}
