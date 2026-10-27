import * as migration_20261023_101920_init from './20261023_101920_init';
import * as migration_20261023_103425_gallery_caption_pricing_spiti from './20261023_103425_gallery_caption_pricing_spiti';
import * as migration_20261027_080305_drop_legacy_price from './20261027_080305_drop_legacy_price';
import * as migration_20261027_081908_enquiries from './20261027_081908_enquiries';

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
    name: '20261027_081908_enquiries'
  },
];
