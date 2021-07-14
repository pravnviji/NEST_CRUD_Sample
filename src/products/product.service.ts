/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const prodId = uuid();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(productId: string) {
    const [Product] = this.findProduct(productId);
    return { ...Product };
  }

  updateProduct(productId: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(productId);
    const updateProduct: Product = { ...product };
    if (title) {
      updateProduct.title = title;
    }
    if (desc) {
      updateProduct.desc = desc;
    }
    if (price) {
      updateProduct.price = price;
    }

    this.products[index] = updateProduct;
  }

  deleteProduct(productId: string) {
    const index = this.findProduct(productId)[1];
    this.products.splice(index);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id == id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product');
    } else {
      return [product, productIndex];
    }
  }

  public loadData() {
    this.products = [
      {
        id: uuid(),
        title: 'IPhone',
        desc: '1st leading seller',
        price: 13000,
      },
      {
        id: uuid(),
        title: 'Samsung s8',
        desc: 'Sold more than 40k mobile first quater',
        price: 18000,
      },
    ];
  }
}
