import { Delete, Logger } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(private readonly productService: ProductService) {
    this.productService.loadData();
  }

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const regeneratedId = this.productService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: regeneratedId, desc: prodDesc };
  }

  @Get()
  getAllProducts() {
    this.logger.log('getAllProducts');
    return this.productService.getProducts();
  }

  @Get(':id')
  getSinglProduct(@Param('id') prodId: string) {
    this.logger.log('getSinglProduct');
    this.logger.log(prodId);
    this.logger.log(decodeURI(prodId));
    return this.productService.getSingleProduct(decodeURI(prodId));
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    this.logger.log('updateProduct');
    this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return 'Updated successfully';
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    this.logger.log('deleteProduct');
    this.productService.deleteProduct(prodId);
    return 'Deleted successfully';
  }
}
