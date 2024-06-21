import {
  Command,
  FailureResult,
  HandlerError,
  OkResult,
} from 'shared/messaging';

import {
  marketsQueryStateSchema,
  polymarketPagePropertiesSchema,
} from '../schema';

interface Payload {
  url: string;
}

export class GetConditionIdCommand extends Command<Payload, string> {
  public readonly name = 'GetConditionIdCommand' as const;

  constructor(
    public payload: Payload,
    id?: string,
  ) {
    super(id ?? null);
  }

  async handle() {
    try {
      const polymarketResponse = await fetch(
        `https://www.idriss.xyz/fetch-data?url=${this.payload.url}`,
      );
      const { text: polymarketHtml } = (await polymarketResponse.json()) as {
        text: string;
      };
      const openGraphSlug = this.extractSlugFromHtml(polymarketHtml);
      const scriptContent = this.extractScriptContent(
        polymarketHtml,
        '__NEXT_DATA__',
      );

      const nextDataJson = scriptContent
        ? JSON.parse(scriptContent)
        : undefined;

      if (!nextDataJson) {
        throw new HandlerError('Document does not __NEXT_DATA__ script tag');
      }

      const polymarketPageProperties =
        polymarketPagePropertiesSchema.parse(nextDataJson);

      const apiEventQuery =
        polymarketPageProperties.props.pageProps.dehydratedState.queries.find(
          (query) => {
            return query.queryKey[0] === '/api/event';
          },
        );

      if (!apiEventQuery) {
        throw new HandlerError(
          'Could not find api event query in page properties',
        );
      }

      const marketsQueryState = marketsQueryStateSchema.parse(
        apiEventQuery.state,
      );

      const marketForOpenGraphSlug = marketsQueryState.data.markets.find(
        (market) => {
          return market.slug === openGraphSlug;
        },
      );

      if (!marketForOpenGraphSlug) {
        throw new HandlerError('Could not find market for open graph slug');
      }

      return new OkResult(marketForOpenGraphSlug.conditionId);
    } catch (error) {
      await this.logException();

      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }

  private extractSlugFromHtml(htmlString: string) {
    const regex =
      /<meta\s+name="twitter:image"\s+content="[^"]*mslug=([^"&]+)"/i;

    const match = regex.exec(htmlString);
    return match?.[1];
  }

  private extractScriptContent(htmlString: string, scriptId: string) {
    // Regular expression to find the script tag with the specific id and extract its content
    // This regex accounts for variations in attribute ordering and spacing
    const regex = new RegExp(
      `<script[^>]*id=["']${scriptId}["'][^>]*>([\\s\\S]*?)<\\/script>`,
      'im',
    );

    // Execute the regex on the HTML string
    const match = regex.exec(htmlString);

    return match?.[1];
  }
}
