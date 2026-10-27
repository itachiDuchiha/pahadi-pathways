import * as migration_20261027_085736_init from './20261027_085736_init';

export const migrations = [
  {
    up: migration_20261027_085736_init.up,
    down: migration_20261027_085736_init.down,
    name: '20261027_085736_init'
  },
];
