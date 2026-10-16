import { Product } from '../types';


export interface ProductRepository {
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
}
