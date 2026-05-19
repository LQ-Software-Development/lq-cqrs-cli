# Arquitetura do experimento LQ CLI

## Objetivo

CLI leve estilo Nest (**C**) com correções e validação do gerador (**B**):

- Padrão default: `service` + `controller` + DTOs
- DDD/CQRS sob flags (`--domain`, `--repository`, `--cqrs`, `--type resource`)
- CI garante que templates + `src/shared/core` compilam em fixture Nest

## Estruturas geradas

### Service (default)

```
src/<module>/<recurso>/
  <recurso>.service.ts
  <recurso>.controller.ts
  dto/<recurso>.request.dto.ts
  dto/<recurso>.response.dto.ts
```

Com `--cqrs command`:

```
src/<module>/usecases/commands/<recurso>/...
```

### Resource DDD (`--type resource`)

```
src/<module>/usecases/<commands|queries>/<recurso>/
  *.usecase.ts
  *.controller.ts
  dtos/*.request.ts
  dtos/*.response.ts
  *.spec.ts
```

### Domain (`--type domain` ou `--domain`)

```
src/<module>/domain/
src/<module>/repositories/
src/<module>/mappers/
src/<module>/models/   # TypeORM
```

## Fronteira Nest CLI vs LQ

| Ferramenta | Responsabilidade |
|------------|------------------|
| `nest g mo` | Módulo Nest, wiring DI |
| `lq service` | Padrão de negócio, Result, DTOs, opcional domínio |

## Validação

O workflow CI executa `__tests__/e2e-generate.test.js`: copia fixture, gera código, roda `tsc --noEmit`.
