import { GetDaoHandlesCommand } from './get-dao-handles';
import { GetServiceStatusCommand } from './get-service-status';

export { useGetServiceStatus } from './get-service-status';

export const COMMAND_MAP = {
  [GetServiceStatusCommand.name]: GetServiceStatusCommand,
  [GetDaoHandlesCommand.name]: GetDaoHandlesCommand,
};
