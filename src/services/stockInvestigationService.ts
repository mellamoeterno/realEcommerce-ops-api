import { randomUUID } from 'crypto';
import { ProductRepository } from '../repositories/productRepository';
import { rules } from '../rules.ts/stockRules';
import { Product, SEVERITY_RANK, StockIssue } from '../types';

export class StockInvestigationService {
  constructor(private readonly products: ProductRepository) {}

  async investigateAll(): Promise<StockIssue[]> {
    const products = await this.products.findAll()
    return this.investigate(products, new Date())
  }

  investigate(products: Product[], now: Date): StockIssue[] {
    const issues: StockIssue[] = [];

    for (const product of products) {
      for (const rule of rules) {
        const result = rule.evaluate(product, now)
        if (!result) continue;

        issues.push({
          id: randomUUID(),
          productId: product.id,
          sku: product.sku,
          productName: product.name,
          type: rule.type,
          severity: rule.severity,
          message: rule.message,
          details: result.details,
          detectedAt: now.toISOString(),
        });
      }
    }
    return issues.sort((a, b) => SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity]);
  }
}