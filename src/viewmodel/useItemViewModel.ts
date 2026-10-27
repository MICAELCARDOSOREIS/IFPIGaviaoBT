import { useState, useEffect, useCallback } from "react";
import type { Produto } from "@/model/entities/Produto";
import { DomainError } from "@/model/errors";
import { menuUseCases } from "@/di/container";
import type { IMenuUseCases } from "@/usecase/iMenuUseCases";

export function useItemViewModel(
  id?: string | string[],
  menu: IMenuUseCases = menuUseCases
) {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);
  const [produto, setProduto] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState<number>(1);

  const produtoId = Array.isArray(id) ? id[0] : id;

  const carregarDetalhes = useCallback(async () => {
    if (!produtoId) return;

    try {
      setCarregando(true);
      setErro(null);
      const resultado = await menu.getProductById(produtoId);
      setProduto(resultado);
    } catch (err) {
      const mensagem =
        err instanceof DomainError
          ? err.message
          : "Erro ao buscar detalhes do produto.";
      setErro(mensagem);
    } finally {
      setCarregando(false);
    }
  }, [produtoId, menu]);

  useEffect(() => {
    carregarDetalhes();
  }, [carregarDetalhes]);

  const decrementarQuantidade = useCallback(() => {
    setQuantidade((prev) => (prev > 1 ? prev - 1 : 1));
  }, []);

  const incrementarQuantidade = useCallback(() => {
    setQuantidade((prev) => prev + 1);
  }, []);

  const formatarPreco = useCallback(
    (valor: number): string => {
      return menu.formatPrice(valor);
    },
    [menu]
  );

  return {
    carregando,
    erro,
    produto,
    quantidade,
    decrementarQuantidade,
    incrementarQuantidade,
    formatarPreco,
    recarregar: carregarDetalhes,
  };
}
