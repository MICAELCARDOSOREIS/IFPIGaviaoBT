import type { Categoria } from "@/model/entities/Categoria";
import type { Produto } from "@/model/entities/Produto";

export interface IMenuUseCases {
  getCategories(): Promise<Categoria[]>;
  getProductsByCategory(categoryId: string): Promise<Produto[]>;
  getProductById(productId: string): Promise<Produto>;
  formatPrice(price: number): string;
  getCategoryName(categoryId?: string | string[]): string;
}
