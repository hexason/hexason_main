import { Controller, Post, Response, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { QrPainterNode } from '@/utils/qr-generator';

@ApiTags('qr')
@Controller('qr')
export class QrController {
  @Post('/generate')
  @UseInterceptors(FileInterceptor('file'))
  async generateQR(@UploadedFile() file: any, @Response() res: any) {
    console.log(file);
    const image = await QrPainterNode({ data: 'chingun', imgBuffer: file.buffer, pathColor: '#ffffff' });
    res.writeHead(200, {
      'Content-Type': 'image/png',
    });

    return res.end(image);
  }
}
