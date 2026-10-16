import { Product } from '../types';
import { ProductRepository } from './productRepository';

const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString();

const SEED: Product[] = [
  { id: 'p1', sku: 'SKU-001', name: 'Ceramic Mug',        quantityLimit: 120, quantityReserved: 10, reorderPoint: 20, isActive: true,  lastRestockedAt: daysAgo(3)  },
  { id: 'p2', sku: 'SKU-002', name: 'Linen Throw',        quantityLimit: -3,  quantityReserved: 0,  reorderPoint: 15, isActive: true,  lastRestockedAt: daysAgo(6)  },
  { id: 'p3', sku: 'SKU-003', name: 'Walnut Cutting Board', quantityLimit: 0, quantityReserved: 0,  reorderPoint: 10, isActive: true,  lastRestockedAt: daysAgo(2)  },
  { id: 'p4', sku: 'SKU-004', name: 'Cast Iron Pan',      quantityLimit: 4,   quantityReserved: 1,  reorderPoint: 10, isActive: true,  lastRestockedAt: daysAgo(9)  },
  { id: 'p5', sku: 'SKU-005', name: 'Wool Blanket',       quantityLimit: 50,  quantityReserved: 60, reorderPoint: 12, isActive: true,  lastRestockedAt: daysAgo(12) },
  { id: 'p6', sku: 'SKU-006', name: 'Copper Kettle',      quantityLimit: 30,  quantityReserved: 2,  reorderPoint: 10, isActive: true,  lastRestockedAt: daysAgo(45) },
  { id: 'p7', sku: 'SKU-007', name: 'Discontinued Lamp',  quantityLimit: 0,   quantityReserved: 0,  reorderPoint: 5,  isActive: false, lastRestockedAt: daysAgo(1)  },
  { id: 'p8', sku: 'SKU-008', name: 'Glass Carafe',       quantityLimit: -1,  quantityReserved: 5,  reorderPoint: 8,  isActive: true,  lastRestockedAt: daysAgo(4)  },
];

export class MockProductRepository implements ProductRepository {
  async findAll(): Promise<Product[]> {
    return SEED;
  }
  async findById(id: string): Promise<Product | null> {
    return SEED.find((p) => p.id === id) ?? null;
  }
}

//p7 (inactive, zero stock) should produce no issues, and p8 should produce two. This to know how the rules are wired correctly.