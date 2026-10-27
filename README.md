# 🦅 IFPI Gavião - Cardápio Digital (MVVM Sofisticado)

> **Atividade Prática de Programação para Dispositivos Móveis (PDM) - IFPI Piripiri | TADS**  
> **Professor:** Iallen Gábio de Sousa Santos  
> **Referência:** Capítulo 10 do Livro de PDM (*"MVVM Sofisticado com React Native, TypeScript e Expo"*)  
> **Branch:** `feature/refactor-mvvm-sofisticado`

---

## 📱 Sobre o Projeto e Evolução Arquitetural

O **IFPI Gavião** é um aplicativo de cardápio digital para uma lanchonete institucional desenvolvido em **React Native**, **Expo (v57)** e **TypeScript**.

Nesta etapa, o projeto evoluiu do padrão **MVVM Simplificado** para a arquitetura profissional do **MVVM Sofisticado**, adotando princípios estritos de **Clean Architecture** e **Inversão de Dependências (DIP)**.

### 🎯 O que mudou no MVVM Sofisticado?

1. **Regras de Negócio em Use Cases (`src/usecase/`):**
   * As ViewModels foram desoneradas de qualquer validação ou regra de domínio. Toda regra fica isolada em casos de uso (`menuUseCases.ts`) sob o contrato `iMenuUseCases.ts`.
2. **Dependência Exclusiva de Abstrações (Interfaces):**
   * Nem as ViewModels nem os Use Cases conhecem implementações concretas; interagem apenas através de contratos (`iProductDataSource.ts`, `iCategoryDataSource.ts`, `iMenuUseCases.ts`).
3. **Isolamento da Infraestrutura (`src/infra/`):**
   * A camada `src/infra/datasources/` gerencia o acesso aos dados com latência assíncrona simulada (`setTimeout`), traduzindo erros técnicos para erros de domínio (`DataSourceError`).
4. **Injeção de Dependências Centralizada (`src/di/container.ts`):**
   * Ponto único de composição (*Composition Root*) que instancia a infraestrutura e a amarra aos Use Cases.
5. **Injeção por Parâmetro Padrão nas ViewModels (`src/viewmodel/`):**
   * Os hooks recebem o UseCase por parâmetro padrão (`menu: IMenuUseCases = menuUseCases`), permitindo que a View consuma diretamente sem wrappers e que testes unitários passem mocks com facilidade.
6. **Hierarquia de Erros de Domínio (`src/model/errors.ts`):**
   * `DomainError`, `ValidationError`, `NotFoundError` e `DataSourceError`. As ViewModels checam `err instanceof DomainError` para fornecer mensagens amigáveis à UI.

---

## 📂 Estrutura de Pastas (MVVM Sofisticado)

```text
src/
├── app/                          ← Rotas finas do Expo Router
│   ├── _layout.tsx
│   ├── index.tsx                 (delega para HomeScreen)
│   ├── category/[id].tsx         (delega para CategoryScreen)
│   └── item/[id].tsx             (delega para ItemScreen)
├── view/                         ← Views: componentes visuais e telas
│   ├── home.tsx                  (Tela 1: Categorias)
│   ├── category.tsx              (Tela 2: Listagem de Itens)
│   └── item.tsx                  (Tela 3: Detalhes do Lanche)
├── viewmodel/                    ← ViewModels: Custom Hooks
│   ├── useHomeViewModel.ts
│   ├── useCategoryViewModel.ts
│   └── useItemViewModel.ts
├── di/                           ← Composition Root (Injeção de Dependências)
│   └── container.ts              (instancia DataSources e exporta menuUseCases)
├── usecase/                      ← Casos de Uso (regras de negócio puras)
│   ├── iMenuUseCases.ts          (contrato)
│   ├── menuUseCases.ts           (implementação)
│   └── menuUseCases.test.ts      (suíte de testes automatizados)
├── model/                        ← Domínio da aplicação
│   ├── entities/                 (Categoria.ts, Produto.ts)
│   ├── datasources/              (iCategoryDataSource.ts, iProductDataSource.ts)
│   └── errors.ts                 (DomainError, ValidationError, DataSourceError)
└── infra/                        ← Infraestrutura e acesso a dados
    └── datasources/
        ├── categoryDataSource.ts (implementa iCategoryDataSource com delay)
        ├── productDataSource.ts  (implementa iProductDataSource com delay)
        └── mockMenuData.ts       (dados em memória do cardápio)
```

---

## 🧪 Testes Automatizados

O projeto conta com suíte de testes unitários para a camada de Casos de Uso, garantindo a validação de regras de negócio desacoplada de React ou Expo:

```bash
bun test
# ou
npm test
```

Para verificar a integridade da tipagem TypeScript em todo o projeto:

```bash
bun run typecheck
```

---

## 🚀 Como Executar o Aplicativo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/MICAELCARDOSOREIS/IFPIGaviaoBT.git
   cd IFPIGaviaoBT
   git checkout feature/refactor-mvvm-sofisticado
   ```

2. **Instale as dependências:**
   ```bash
   bun install # ou npm install
   ```

3. **Inicie o servidor do Expo:**
   ```bash
   npx expo start
   ```

4. **Execute no dispositivo:**
   * Pressione `a` para emulador Android, `i` para simulador iOS ou `w` para Web.
   * Ou escaneie o QR Code com o aplicativo **Expo Go** no seu smartphone.

---

*IFPI - Campus Piripiri*  
*Tecnologia em Análise e Desenvolvimento de Sistemas (TADS)*  
*Disciplina: Programação para Dispositivos Móveis (PDM)*
