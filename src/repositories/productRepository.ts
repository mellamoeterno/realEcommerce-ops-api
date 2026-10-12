import { Product } from '../types';

export interface ProductRepository {

    export interface productRepository {
        findAll(): Promise<Product[]>;
        findById(id: string): Promise<Product | null>;
    }
}