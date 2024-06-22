import { z } from 'zod';

import {
  Command,
  FailureResult,
  HandlerError,
  OkResult,
} from 'shared/messaging';

type Payload = Record<string, never>;

const responseSchema = z.record(z.string(), z.record(z.string(), z.string()));
type Response = z.infer<typeof responseSchema>;

export class GetDaoHandlesCommand extends Command<Payload, Response> {
  public readonly name = 'GetDaoHandlesCommand' as const;

  constructor(
    public payload: Record<string, never>,
    id?: string,
  ) {
    super(id ?? null);
  }

  async handle() {
    try {
      const response = await fetch('https://api.idriss.xyz/dao-handles');
      const json = await response.json();
      const validationResult = responseSchema.safeParse(json);
      if (!validationResult.success) {
        throw new HandlerError('Schema validation failed');
      }

      return new OkResult(validationResult.data);
    } catch (error) {
      await this.logException();
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}
