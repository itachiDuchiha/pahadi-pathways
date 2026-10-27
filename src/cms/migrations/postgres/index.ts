import * as migration_20261027_085736_init from './20261027_085736_init';
import * as migration_20261027_093747_clear_sedan_equal_to_base from './20261027_093747_clear_sedan_equal_to_base';
import * as migration_20261027_105057_stay_meal_per_night from './20261027_105057_stay_meal_per_night';

export const migrations = [
  {
    up: migration_20261027_085736_init.up,
    down: migration_20261027_085736_init.down,
    name: '20261027_085736_init',
  },
  {
    up: migration_20261027_093747_clear_sedan_equal_to_base.up,
    down: migration_20261027_093747_clear_sedan_equal_to_base.down,
    name: '20261027_093747_clear_sedan_equal_to_base',
  },
  {
    up: migration_20261027_105057_stay_meal_per_night.up,
    down: migration_20261027_105057_stay_meal_per_night.down,
    name: '20261027_105057_stay_meal_per_night'
  },
];
