import type { IProductDataSource } from "@/model/datasources/iProductDataSource";
import type { Produto } from "@/model/entities/Produto";
import { DataSourceError } from "@/model/errors";
import { BANCO_PRODUTOS, DELAY_MS } from "./mockMenuData";

export class ProductDataSource implements IProductDataSource {
  async getProductsByCategory(categoryId: string): Promise<Produto[]> {
    try {
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
      return BANCO_PRODUTOS.filter((p) => p.categoriaId === categoryId);
    } catch {
      throw new DataSourceError(`Falha ao carregar produtos da categoria "${categoryId}".`);
    }
  }

  async getProductById(productId: string): Promise<Produto | null> {
    try {
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
      const produto = BANCO_PRODUTOS.find((p) => p.id === productId);
      return produto ? { ...produto } : null;
    } catch {
      throw new DataSourceError(`Falha ao consultar produto com id "${productId}".`);
    }
  }

  async getAllProducts(): Promise<Produto[]> {
    try {
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
      return [...BANCO_PRODUTOS];
    } catch {
      throw new DataSourceError("Falha ao carregar todos os produtos.");
    }
  }
}
