import { BaseEnvironment } from './environment.base';

const production = false;

const overrides = {
  production
};

export const environment = {
  ...BaseEnvironment,
  ...overrides
};
