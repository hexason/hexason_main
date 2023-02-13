import { InjectDataSource } from "@nestjs/typeorm";
import { Order } from "src/models/order";
import { OrderItem } from "src/models/order_item";
import { DataSource } from "typeorm";

export class OrderService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  createOrder(userId:string, addressData: {city:string, district:string, address:string}, products: {id:string, price:number, quantity:number}[]) {
    const repoOrder = this.dataSource.getRepository(Order);
    const repoOrderItem = this.dataSource.getRepository(OrderItem);
    return this.dataSource.transaction(async (manager) => {
      const {city, address, district} = addressData
      const order = repoOrder.create({
        user: userId as any,
        paymentMessage: "waiting",
        totalPrice: products.reduce((acc, item) => acc + item.quantity * item.price, 0),
        city,
        district,
        address,
      });      
      await manager.save(order);

      const orderItems = products.map((product) => {
        return repoOrderItem.create({
          product: product.id as any,
          quantity: product.quantity,
          totalPrice: product.quantity * product.price,
          order
        })
      });
      order.items = orderItems;

      await manager.save(orderItems);

      for (const product of products) {
        await manager.update('product', product.id, {
          quantity: () => `"quantity" - ${product.quantity}`,
        });
      }

      return orderItems;
    });
  }
}