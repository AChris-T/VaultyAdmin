export function createQueryKeys<TEntity extends string>(entity: TEntity) {
  return {
    all: [entity] as const,
    lists: () => [entity, 'list'] as const,
    list: (filters?: Record<string, unknown>) =>
      [entity, 'list', filters ?? {}] as const,
    details: () => [entity, 'detail'] as const,
    detail: (id: string | number) => [entity, 'detail', id] as const,
  };
}
