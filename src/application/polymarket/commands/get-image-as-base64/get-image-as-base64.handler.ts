import { Handler, OkResult } from 'shared/messaging';

import { GetImageAsBase64Command } from './get-image-as-base64.command';

const base = 'https://www.idriss.xyz/fetch-image?url=';
export class GetImageAsBase64Handler implements Handler {
  async handle(command: GetImageAsBase64Command) {
    const response = await fetch(`${base}${command.details.url}`);
    const json = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new OkResult((json as any).image as string);
  }
}
