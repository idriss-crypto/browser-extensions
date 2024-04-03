import { Command } from 'shared/messaging';

import {
  SendExceptionEventCommand,
  SendMonitoringEventCommand,
} from './commands';
import { MonitoringEvent, ExceptionEvent } from './monitoring.types';

export const sendMonitoringEvent = async (event: MonitoringEvent) => {
  try {
    const command = new SendMonitoringEventCommand({ event });
    return command.send<void>();
  } catch {
    console.error(`Couldn't send monitoring event`);
  }
};

export const sendExceptionEvent = async (event: ExceptionEvent) => {
  try {
    const command = new SendExceptionEventCommand({ event });
    await command.send<void>();
  } catch {
    console.error(`Couldn't send exception event`);
  }
};

export const sendHandlerExceptionEvent = async (command: Command) => {
  return sendExceptionEvent({
    name: 'command-handler-error',
    meta: {
      command: {
        id: command.id,
        name: command.name,
        details: command.details,
      },
    },
  });
};
