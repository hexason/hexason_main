import { AdminJWTGuard } from "@/middleware/admin_jwt.guard";
import { Controller, UseGuards, Request, Get, StreamableFile } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { createReadStream } from "fs";
import { join } from "path";

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


  @Get()
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }
}