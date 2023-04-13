import { AdminJWTGuard } from "@/middleware/admin_jwt.guard";
import { Controller, UseGuards, Request, Get, SetMetadata } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor() { }

  @UseGuards(AdminJWTGuard)
  @ApiBearerAuth("admin-access")
  @Get("me")
  async getMe(@Request() req: any) {
    return req.user;
  }
}