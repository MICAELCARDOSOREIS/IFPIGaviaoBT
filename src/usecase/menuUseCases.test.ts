import { describe, expect, it } from "bun:test";
import { MenuUseCases } from "./menuUseCases";
import { NotFoundError, ValidationError } from "@/model/errors";
import type { ICategoryDataSource } from "@/model/datasources/iCategoryDataSource";
import type { IProductDataSource } from "@/model/datasources/iProductDataSource";
import type { Categoria } from "@/model/entities/Categoria";
import type { Produto } from "@/model/entities/Produto";

const fakeCategories: Categoria[] = [
  {
    id: "comidas",
    nome: "Comidas",
    corBorda: "#501673",
    corSeta: "#501673",
    imagem: 1 as any,
  },
  {
    id: "bebidas",
    nome: "Bebidas",
    corBorda: "#1b873f",
    corSeta: "#1b873f",
    imagem: 2 as any,
  },
];

const fakeProducts: Produto[] = [
  {
    id: "pastel-de-carne",
    categoriaId: "comidas",
    categoriaNome: "Comida",
    nome: "Pastel de Carne",
    preco: 6.0,
    descricao: "Pastel frito na hora",
    proteinas: "14g",
    carboidratos: "32g",
    gorduras: "18g",
    imagem: 3 as any,
    imagemGrande: 4 as any,
  },
];

const fakeCategoryDataSource: ICategoryDataSource = {
  getCategories: async () => fakeCategories,
  getCategoryById: async (id: string) =>
    fakeCategories.find((c) => c.id === id) ?? null,
};

const fakeProductDataSource: IProductDataSource = {
  getProductsByCategory: async (categoryId: string) =>
    fakeProducts.filter((p) => p.categoriaId === categoryId),
  getProductById: async (productId: string) =>
    fakeProducts.find((p) => p.id === productId) ?? null,
  getAllProducts: async () => fakeProducts,
};

describe("MenuUseCases (MVVM Sofisticado)", () => {
  const useCases = new MenuUseCases(fakeCategoryDataSource, fakeProductDataSource);

  it("deve listar todas as categorias disponíveis", async () => {
    const categorias = await useCases.getCategories();
    expect(categorias).toHaveLength(2);
    expect(categorias[0].nome).toBe("Comidas");
  });

  it("deve filtrar produtos pela categoria corretamente", async () => {
    const produtos = await useCases.getProductsByCategory("comidas");
    expect(produtos).toHaveLength(1);
    expect(produtos[0].nome).toBe("Pastel de Carne");
  });

  it("deve lançar ValidationError se categoriaId for vazio", async () => {
    expect(useCases.getProductsByCategory("")).rejects.toBeInstanceOf(ValidationError);
  });

  it("deve retornar os detalhes do produto quando o id existir", async () => {
    const produto = await useCases.getProductById("pastel-de-carne");
    expect(produto.id).toBe("pastel-de-carne");
    expect(produto.preco).toBe(6.0);
  });

  it("deve lançar NotFoundError quando o produto não existir", async () => {
    expect(useCases.getProductById("produto-fantasma")).rejects.toBeInstanceOf(NotFoundError);
  });

  it("deve lançar ValidationError se o productId for vazio", async () => {
    expect(useCases.getProductById("   ")).rejects.toBeInstanceOf(ValidationError);
  });

  it("deve formatar o preço em moeda BRL (R$)", () => {
    expect(useCases.formatPrice(6.0)).toBe("R$ 6,00");
    expect(useCases.formatPrice(14.5)).toBe("R$ 14,50");
    expect(useCases.formatPrice(NaN)).toBe("R$ 0,00");
  });

  it("deve resolver nomes de categorias amigáveis para a tela", () => {
    expect(useCases.getCategoryName("bebidas")).toBe("Bebidas");
    expect(useCases.getCategoryName("comidas")).toBe("Comidas");
    expect(useCases.getCategoryName("outra")).toBe("Cardápio");
  });
});
