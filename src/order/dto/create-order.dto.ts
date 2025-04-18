import { OrderStatus } from 'prisma/__generated__'


type CartItemJson = {
  cartId: number;
  productVariant: string;
	productVariantName:string;
  product: string;
  size: string;
  quantity: number;
	ingredients?:string
	weight?:number
  createdAt: Date;
  updatedAt: Date;
};

export class CreateOrderDto {
	totalAmount:number;
	status: OrderStatus
	items:CartItemJson[]
	firstName:string
	lastName:string
	email:string
	phone:string
	address:string
	comment:string
	userId:number
}
