import { useState, useEffect, useCallback } from "react";
import type { Produto } from "@/model/entities/Produto";
import { DomainError } from "@/model/errors";
import { menuUseCases } from "@/di/container";
import type { IMenuUseCases } from "@/usecase/iMenuUseCases";

export function useCategoryViewModel(
  id?: string | string[],
  menu: IMenuUseCases = menuUseCases
) {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const categoriaId = Array.isArray(id) ? id[0] : id;
  const nomeCategoria = menu.getCategoryName(categoriaId);

  const carregarProdutos = useCallback(async () => {
    if (!categoriaId) return;

    try {
      setCarregando(true);
      setErro(null);
      const resultado = await menu.getProductsByCategory(categoriaId);
      setProdutos(resultado);
    } catch (err) {
      const mensagem =
        err instanceof DomainError
          ? err.message
          : "Erro ao buscar produtos da categoria.";
      setErro(mensagem);
    } finally {
      setCarregando(false);
    }
  }, [categoriaId, menu]);

  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  const formatarPreco = useCallback(
    (valor: number): string => {
      return menu.formatPrice(valor);
    },
    [menu]
  );

  return {
    carregando,
    erro,
    produtos,
    nomeCategoria,
    formatarPreco,
    recarregar: carregarProdutos,
  };
}
