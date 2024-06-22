import { GetDaoHandlesCommand } from './get-dao-handles';
import { GetServiceStatusCommand } from './get-service-status';

export const COMMAND_MAP = {
  [GetServiceStatusCommand.name]: GetServiceStatusCommand,
  [GetDaoHandlesCommand.name]: GetDaoHandlesCommand,
};

export { GetServiceStatusCommand } from './get-service-status';
export { GetDaoHandlesCommand } from './get-dao-handles';
