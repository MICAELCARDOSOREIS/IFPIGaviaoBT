import type { ICategoryDataSource } from "@/model/datasources/iCategoryDataSource";
import type { Categoria } from "@/model/entities/Categoria";
import { DataSourceError } from "@/model/errors";
import { BANCO_CATEGORIAS, DELAY_MS } from "./mockMenuData";

export class CategoryDataSource implements ICategoryDataSource {
  async getCategories(): Promise<Categoria[]> {
    try {
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
      return [...BANCO_CATEGORIAS];
    } catch {
      throw new DataSourceError("Falha ao consultar categorias no banco de dados.");
    }
  }

  async getCategoryById(id: string): Promise<Categoria | null> {
    try {
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
      const categoria = BANCO_CATEGORIAS.find((c) => c.id === id);
      return categoria ? { ...categoria } : null;
    } catch {
      throw new DataSourceError(`Falha ao consultar categoria "${id}".`);
    }
  }
}
