import { Produto } from "../entities/Produto";

export interface IProductDataSource {
  getProductsByCategory(categoryId: string): Promise<Produto[]>;
  getProductById(productId: string): Promise<Produto | null>;
  getAllProducts(): Promise<Produto[]>;
}
