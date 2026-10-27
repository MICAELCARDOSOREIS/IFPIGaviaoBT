import { useState, useEffect, useCallback } from "react";
import type { Categoria } from "@/model/entities/Categoria";
import { DomainError } from "@/model/errors";
import { menuUseCases } from "@/di/container";
import type { IMenuUseCases } from "@/usecase/iMenuUseCases";

export function useHomeViewModel(menu: IMenuUseCases = menuUseCases) {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const carregarCategorias = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      const resultado = await menu.getCategories();
      setCategorias(resultado);
    } catch (err) {
      const mensagem =
        err instanceof DomainError
          ? err.message
          : "Não foi possível carregar as categorias.";
      setErro(mensagem);
    } finally {
      setCarregando(false);
    }
  }, [menu]);

  useEffect(() => {
    carregarCategorias();
  }, [carregarCategorias]);

  return {
    carregando,
    erro,
    categorias,
    recarregar: carregarCategorias,
  };
}
