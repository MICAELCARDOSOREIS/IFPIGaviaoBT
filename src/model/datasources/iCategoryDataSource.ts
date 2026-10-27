import { Categoria } from "../entities/Categoria";

export interface ICategoryDataSource {
  getCategories(): Promise<Categoria[]>;
  getCategoryById(id: string): Promise<Categoria | null>;
}
