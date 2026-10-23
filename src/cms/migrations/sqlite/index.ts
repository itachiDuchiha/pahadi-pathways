import * as migration_20261023_101920_init from './20261023_101920_init';
import * as migration_20261023_103425_gallery_caption_pricing_spiti from './20261023_103425_gallery_caption_pricing_spiti';

export const migrations = [
  {
    up: migration_20261023_101920_init.up,
    down: migration_20261023_101920_init.down,
    name: '20261023_101920_init',
  },
  {
    up: migration_20261023_103425_gallery_caption_pricing_spiti.up,
    down: migration_20261023_103425_gallery_caption_pricing_spiti.down,
    name: '20261023_103425_gallery_caption_pricing_spiti'
  },
];
