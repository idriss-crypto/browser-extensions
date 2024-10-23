import { z } from 'zod';

import {
  Command,
  FailureResult,
  HandlerError,
  HandlerResponseError,
  OkResult,
} from 'shared/messaging';

import { Api } from '../api';
import { Application } from '../types';
import { applicationSchema } from '../schema';

type Payload = Record<string, never>;
const responseSchema = z.array(applicationSchema);

export class GetApplicationsCommand extends Command<Payload, Application[]> {
  public readonly name = 'GetApplicationsCommand' as const;

  constructor(public payload: Payload) {
    super();
  }

  async handle() {
    try {
      const response = await Api.getApplications();

      if (!response.ok) {
        const responseText = await response.text();
        throw new HandlerResponseError(
          this.name,
          responseText,
          response.status,
        );
      }

      const json = await response.json();

      const validationResult = responseSchema.safeParse(json);
      if (!validationResult.success) {
        throw new HandlerError('Schema validation failed');
      }

      return new OkResult(validationResult.data);
    } catch (error) {
      this.captureException(error);
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}
