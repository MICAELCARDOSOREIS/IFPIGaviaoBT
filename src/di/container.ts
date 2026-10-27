import { CategoryDataSource } from "@/infra/datasources/categoryDataSource";
import { ProductDataSource } from "@/infra/datasources/productDataSource";
import { MenuUseCases } from "@/usecase/menuUseCases";
import type { IMenuUseCases } from "@/usecase/iMenuUseCases";
import type { ICategoryDataSource } from "@/model/datasources/iCategoryDataSource";
import type { IProductDataSource } from "@/model/datasources/iProductDataSource";

// 1. Instanciação única da infraestrutura (Composition Root)
export const categoryDataSource: ICategoryDataSource = new CategoryDataSource();
export const productDataSource: IProductDataSource = new ProductDataSource();

// 2. Composição e exportação dos Use Cases
export const menuUseCases: IMenuUseCases = new MenuUseCases(
  categoryDataSource,
  productDataSource
);
