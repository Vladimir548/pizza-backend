import { PartialType } from '@nestjs/mapped-types';
import { ProportionDto } from './proportion.dto';

export class UpdateProportionDto extends PartialType(ProportionDto) {}
