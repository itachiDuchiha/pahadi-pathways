import * as migration_20261023_101920_init from './20261023_101920_init';
import * as migration_20261023_103425_gallery_caption_pricing_spiti from './20261023_103425_gallery_caption_pricing_spiti';
import * as migration_20261027_080305_drop_legacy_price from './20261027_080305_drop_legacy_price';
import * as migration_20261027_081908_enquiries from './20261027_081908_enquiries';
import * as migration_20261027_082751_enquiries_package_text from './20261027_082751_enquiries_package_text';
import * as migration_20261027_093704_clear_sedan_equal_to_base from './20261027_093704_clear_sedan_equal_to_base';
import * as migration_20261027_104808_stay_meal_per_night from './20261027_104808_stay_meal_per_night';
import * as migration_20261027_114014_legal_settings from './20261027_114014_legal_settings';

export const migrations = [
  {
    up: migration_20261023_101920_init.up,
    down: migration_20261023_101920_init.down,
    name: '20261023_101920_init',
  },
  {
    up: migration_20261023_103425_gallery_caption_pricing_spiti.up,
    down: migration_20261023_103425_gallery_caption_pricing_spiti.down,
    name: '20261023_103425_gallery_caption_pricing_spiti',
  },
  {
    up: migration_20261027_080305_drop_legacy_price.up,
    down: migration_20261027_080305_drop_legacy_price.down,
    name: '20261027_080305_drop_legacy_price',
  },
  {
    up: migration_20261027_081908_enquiries.up,
    down: migration_20261027_081908_enquiries.down,
    name: '20261027_081908_enquiries',
  },
  {
    up: migration_20261027_082751_enquiries_package_text.up,
    down: migration_20261027_082751_enquiries_package_text.down,
    name: '20261027_082751_enquiries_package_text',
  },
  {
    up: migration_20261027_093704_clear_sedan_equal_to_base.up,
    down: migration_20261027_093704_clear_sedan_equal_to_base.down,
    name: '20261027_093704_clear_sedan_equal_to_base',
  },
  {
    up: migration_20261027_104808_stay_meal_per_night.up,
    down: migration_20261027_104808_stay_meal_per_night.down,
    name: '20261027_104808_stay_meal_per_night',
  },
  {
    up: migration_20261027_114014_legal_settings.up,
    down: migration_20261027_114014_legal_settings.down,
    name: '20261027_114014_legal_settings'
  },
];
