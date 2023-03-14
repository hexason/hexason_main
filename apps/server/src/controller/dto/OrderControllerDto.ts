import { IsIn, IsString } from "class-validator";

export class OrderStatusChangeDTO {
  @IsString()
  @IsIn(["pending", "paid", "done", "cancel"])
  status: "pending" | "paid" | "done" | "cancel"
}