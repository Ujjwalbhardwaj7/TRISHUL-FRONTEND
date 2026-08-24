import { apiRequest, unavailableEndpoint } from '../../../api/client';
import { commandCenterFixture } from '../fixtures/commandCenter.fixture';
import type { CommandCenterData } from '../commandCenter.types';

const configuredEndpoint = import.meta.env.VITE_COMMAND_CENTER_PATH;

/** Adapter boundary for the future Command Center backend contract. */
export async function getCommandCenterData(): Promise<CommandCenterData> {
  if (configuredEndpoint) return apiRequest<CommandCenterData>(configuredEndpoint);
  if (import.meta.env.DEV) return commandCenterFixture;
  return unavailableEndpoint('Command Center data');
}
