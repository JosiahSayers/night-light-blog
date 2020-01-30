import { BaseEnvironment } from './environment.base';

const production = true;

const overrides = {
  production
};

export const environment = {
  ...BaseEnvironment,
  ...overrides
};
