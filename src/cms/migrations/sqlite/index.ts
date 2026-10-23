import * as migration_20261023_101920_init from './20261023_101920_init';

export const migrations = [
  {
    up: migration_20261023_101920_init.up,
    down: migration_20261023_101920_init.down,
    name: '20261023_101920_init'
  },
];
