import { randomUUID } from 'crypto';
import { ProductRepository } from '../repositories/productRepository';
import { stockRoutes } from '../routes/stockRoutes';
import { Product, SEVERITY_RANK, StockIssue } from '../types';

export class StockInvestigationService {
  constructor(private readonly products: ProductRepository) {}

  async investigateAll(): Promise<StockIssue[]> {
    const products = await this.products.findAll();
    return this.investigate(products, new Date());
  }

}//....fix&continueHere