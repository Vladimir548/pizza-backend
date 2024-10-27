import { OrderStatus } from "@prisma/client";

type CartItemJson = {
  cartId: number;
  productVariantId: number;
  productId: number;
  sizeId: number;
  quantity: number;
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
