import * as migration_20261027_085736_init from './20261027_085736_init';
import * as migration_20261027_093747_clear_sedan_equal_to_base from './20261027_093747_clear_sedan_equal_to_base';

export const migrations = [
  {
    up: migration_20261027_085736_init.up,
    down: migration_20261027_085736_init.down,
    name: '20261027_085736_init',
  },
  {
    up: migration_20261027_093747_clear_sedan_equal_to_base.up,
    down: migration_20261027_093747_clear_sedan_equal_to_base.down,
    name: '20261027_093747_clear_sedan_equal_to_base'
  },
];
