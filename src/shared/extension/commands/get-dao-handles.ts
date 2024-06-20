import { Command, OkResult, useCommandQuery } from 'shared/messaging';

export class GetDaoHandlesCommand extends Command<
  Record<string, never>,
  Record<string, Record<string, string>>
> {
  public readonly name = 'GetDaoHandlesCommand' as const;

  constructor(
    public details: Record<string, never>,
    id?: string,
  ) {
    super(id ?? null);
  }

  async handle() {
    const response = await fetch('https://api.idriss.xyz/dao-handles');
    const json = await response.json();
    return new OkResult(json as Record<string, Record<string, string>>);
  }
}

export const useGetDaoHandles = (applicationName: string) => {
  return useCommandQuery({
    staleTime: Number.POSITIVE_INFINITY,
    command: new GetDaoHandlesCommand({}),
    select: (handles) => {
      return handles[applicationName.toLowerCase()] ?? {};
    },
  });
};
