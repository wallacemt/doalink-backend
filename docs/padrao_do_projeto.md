## 🏗️ Padrão de Projeto e Boas Práticas

### Estrutura de Pastas

- `controllers/`: Lógica de entrada/saída das rotas, validação inicial e chamada dos services.
- `services/`: Regras de negócio, validações e orquestração entre repositórios.
- `db/schemas/`: Definição dos modelos/tabelas usando Drizzle ORM.
- `middleware/`: Middlewares Express para autenticação, logging, etc.
- `utils/`: Funções utilitárias e helpers.
- `validations/`: Schemas de validação (ex: Zod).

### Middleware

- Sempre tipar `Request`, `Response` e `NextFunction`.
- Middlewares de autenticação devem validar o token JWT e adicionar o `userId` ao objeto `Request`.
- Retornar status HTTP apropriados e mensagens claras em caso de erro.

Exemplo:

```ts
import type { Request, Response, NextFunction } from "express";
export default function exemplo(req: Request, res: Response, next: NextFunction) {
  // ...
}
```

### Services

- Services devem ser classes.
- Não acessar diretamente o banco: use um repository.
- Trate erros lançando exceções customizadas (`Exception`).
- Não expor detalhes de implementação do banco para o controller.
- Métodos assíncronos (`async`).

Exemplo:

```ts
export class ExemploService {
  async metodoExemplo(param: string) {
    // ... lógica de negócio
  }
}
```

### Repository (Drizzle ORM)

- Cada entidade deve ter um repository dedicado.
- Use os schemas do Drizzle para tipagem.
- Não implemente lógica de negócio no repository, apenas acesso a dados.
- Métodos comuns: `findById`, `findAll`, `create`, `update`, `delete`.

Exemplo:

```ts
import { db } from "../db";
import { users } from "../db/schemas/user";

export class UserRepository {
  async findByEmail(email: string) {
    return db.select().from(users).where(users.email.eq(email)).first();
  }
  // ... outros métodos
}
```

### Boas Práticas Gerais

- Use tipagem forte (TypeScript) em todo o projeto.
- Separe responsabilidades: controller (entrada/saída), service (negócio), repository (dados).
- Valide dados de entrada com schemas (ex: Zod) antes de processar.
- Use variáveis de ambiente para segredos e configurações sensíveis.
- Escreva testes para services e controllers.
- Siga o padrão de nomenclatura: arquivos e pastas em `camelCase` ou `kebab-case`.

---