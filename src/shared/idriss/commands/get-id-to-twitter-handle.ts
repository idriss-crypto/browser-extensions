import {
  Command,
  FailureResult,
  HandlerError,
  HandlerResponseError,
  OkResult,
} from 'shared/messaging';

interface Payload {
  ids: string[];
}

type Response = Record<string, string | null>;
type TwitterNameResponse = Record<string, string>;

export class GetIdToTwitterHandleCommand extends Command<Payload, Response> {
  public readonly name = 'GetIdToTwitterHandleCommand' as const;

  constructor(public payload: Payload) {
    super();
  }

  async handle() {
    try {
      const response = await fetch(getRegisteredTwittersUrl(this.payload.ids));

      if (!response.ok) {
        const responseText = await response.text();
        throw new HandlerResponseError(
          this.name,
          responseText,
          response.status,
        );
      }
      const json = await response.json();

      const validatedResponse = json as TwitterNameResponse;

      if (typeof validatedResponse !== 'object' || validatedResponse === null) {
        throw new Error('Invalid response: expected an object');
      }

      return new OkResult(validatedResponse);
    } catch (error) {
      this.captureException(error);
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}

const GET_REGISTERED_TWITTERS_URL =
  'https://www.idriss.xyz/v1/getTwitterNamesPlugin';

const getRegisteredTwittersUrl = (ids: string[]) => {
  return `${GET_REGISTERED_TWITTERS_URL}?ids=${encodeURIComponent(ids.join(','))}`;
};
