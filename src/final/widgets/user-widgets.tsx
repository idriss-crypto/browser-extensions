import { useEffect, useState } from 'react';

import { ErrorBoundary } from 'shared/observability';
import { GitcoinDonationWidget } from 'application/gitcoin';
import { IdrissSendWidget } from 'application/idriss-send';

import { useUserWidgets } from '../hooks';

export const UserWidgets = () => {
  const { widgets } = useUserWidgets();

  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCanRender(true);
    }, 3000);
  }, []);

  if (!canRender) {
    return null;
  }

  return (
    <ErrorBoundary>
      {widgets.map((widget) => {
        const key = `${widget.username}-${Math.floor(widget.top)}`;

        if (widget.type === 'gitcoin') {
          return <GitcoinDonationWidget key={key} widgetData={widget} />;
        }

        return <IdrissSendWidget key={key} widgetData={widget} />;
      })}
    </ErrorBoundary>
  );
};
