import { Body, Controller, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { CreateSupplierDto, UpdateSupplierDto } from '../validation/SupplierControllerDto';
import { SupplierService } from '../services';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post('create')
  async supplierAdd(@Body() { name, description, logo, location }: CreateSupplierDto) {
    const supplier = await this.supplierService.createSupplier({
      name: name,
      description: description || '',
      logo: logo || '',
      location: location,
    });
    return supplier;
  }

  @Get('item/:id')
  async getSupplier(@Param('id') id: string) {
    const supplier = await this.supplierService.getSupplierById(id);
    return supplier;
  }

  @Get()
  async getSuppliers() {
    const suppliers = await this.supplierService.getSupplier();
    return suppliers;
  }

  @Put(':id')
  async updateSupplier(@Param('id') id: string, @Body() data: UpdateSupplierDto) {
    try {
      const supplier = await this.supplierService.getSupplierById(id);
      if (!supplier) throw new HttpException({ code: 'NOT_FOUND_DATA', message: 'Supplier not found' }, 404);
      return await this.supplierService.updateSupplier(supplier, data);
    } catch (e) {
      if (e.code) throw new HttpException(e, 400);
      throw e;
    }
  }
}
