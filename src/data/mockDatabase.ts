// ============================================================================
// SIMULAÇÃO DO BANCO DE DADOS LOCAL (DEPRECATED NA ARQUITETURA SOFISTICADA)
// Os dados e a persistência foram migrados para src/infra/datasources/.
// Este arquivo é mantido apenas como fachada de compatibilidade.
// ============================================================================

import { BANCO_CATEGORIAS, BANCO_PRODUTOS } from "@/infra/datasources/mockMenuData";
import { categoryDataSource, productDataSource } from "@/di/container";

export { BANCO_CATEGORIAS, BANCO_PRODUTOS };

export async function simularConsultaCategorias() {
  return categoryDataSource.getCategories();
}

export async function simularConsultaProdutosPorCategoria(categoriaId: string) {
  return productDataSource.getProductsByCategory(categoriaId);
}

export async function simularConsultaProdutoPorId(produtoId: string) {
  return productDataSource.getProductById(produtoId);
}
