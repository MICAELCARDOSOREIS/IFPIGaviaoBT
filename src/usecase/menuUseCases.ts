import type { ICategoryDataSource } from "@/model/datasources/iCategoryDataSource";
import type { IProductDataSource } from "@/model/datasources/iProductDataSource";
import type { Categoria } from "@/model/entities/Categoria";
import type { Produto } from "@/model/entities/Produto";
import { NotFoundError, ValidationError } from "@/model/errors";
import type { IMenuUseCases } from "./iMenuUseCases";

export class MenuUseCases implements IMenuUseCases {
  constructor(
    private readonly categoryDataSource: ICategoryDataSource,
    private readonly productDataSource: IProductDataSource
  ) {}

  async getCategories(): Promise<Categoria[]> {
    return this.categoryDataSource.getCategories();
  }

  async getProductsByCategory(categoryId: string): Promise<Produto[]> {
    const trimmedId = categoryId ? categoryId.trim() : "";
    if (!trimmedId) {
      throw new ValidationError("Categoria não informada para busca dos itens.");
    }

    return this.productDataSource.getProductsByCategory(trimmedId);
  }

  async getProductById(productId: string): Promise<Produto> {
    const trimmedId = productId ? productId.trim() : "";
    if (!trimmedId) {
      throw new ValidationError("Identificador do produto não informado.");
    }

    const produto = await this.productDataSource.getProductById(trimmedId);
    if (!produto) {
      throw new NotFoundError(`Produto "${trimmedId}" não encontrado no cardápio.`);
    }

    return produto;
  }

  formatPrice(price: number): string {
    if (typeof price !== "number" || isNaN(price)) {
      return "R$ 0,00";
    }
    return `R$ ${price.toFixed(2).replace(".", ",")}`;
  }

  getCategoryName(categoryId?: string | string[]): string {
    const id = Array.isArray(categoryId) ? categoryId[0] : categoryId;
    if (id === "bebidas") return "Bebidas";
    if (id === "comidas") return "Comidas";
    return "Cardápio";
  }
}
