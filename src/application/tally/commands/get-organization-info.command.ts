import {
  Command,
  FailureResult,
  HandlerError,
  OkResult,
} from 'shared/messaging';

import { generateGetOrganizationInfoQuery } from '../utils';
import { TALLY_GRAPHQL_API_URL } from '../constants';
import { getOrganizationInfoResponseSchema } from '../schema';
import { OrganizationInfo } from '../types';

interface Details {
  tallyName: string;
}

export class GetOrganizationInfoCommand extends Command<
  Details,
  OrganizationInfo
> {
  public readonly name = 'GetOrganizationInfoCommand' as const;

  constructor(
    public details: Details,
    id?: string,
  ) {
    super(id ?? null);
  }

  async handle() {
    try {
      const query = generateGetOrganizationInfoQuery();

      const response = await fetch(TALLY_GRAPHQL_API_URL, {
        method: 'POST',
        body: JSON.stringify({
          query: query,
          variables: {
            input: {
              slug: this.details.tallyName,
            },
          },
        }),
        headers: {
          'Content-Type': 'application/json',
          'Api-Key':
            'a0a4cd00bb6953720c9c201c010cdd36a563e65c97e926a36a8acdfcd1d1eeb7',
        },
      });

      if (response.status !== 200) {
        throw new HandlerError();
      }
      const json = await response.json();
      const validResponse = getOrganizationInfoResponseSchema.parse(json);
      const organizationInfo = validResponse.data.organization;
      if (!organizationInfo) {
        throw new HandlerError('organizationInfo not found');
      }

      return new OkResult(organizationInfo);
    } catch (error) {
      await this.trackHandlerException();
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}
