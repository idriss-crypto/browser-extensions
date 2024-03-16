import {
  SendExceptionEventCommand,
  SendMonitoringEventCommand,
} from './commands';
import { MonitoringEvent, ExceptionEvent } from './monitoring.types';

export const sendMonitoringEvent = async (event: MonitoringEvent) => {
  const command = new SendMonitoringEventCommand({ event });
  return command.send<void>();
};

export const sendExceptionEvent = async (event: ExceptionEvent) => {
  const command = new SendExceptionEventCommand({ event });
  return command.send<void>();
};
