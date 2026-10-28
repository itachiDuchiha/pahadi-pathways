import * as migration_20261027_085736_init from './20261027_085736_init';
import * as migration_20261027_093747_clear_sedan_equal_to_base from './20261027_093747_clear_sedan_equal_to_base';
import * as migration_20261027_105057_stay_meal_per_night from './20261027_105057_stay_meal_per_night';
import * as migration_20261027_114054_legal_settings from './20261027_114054_legal_settings';
import * as migration_20261027_115036_legal_effective_date_required from './20261027_115036_legal_effective_date_required';
import * as migration_20261027_115730_notification_settings from './20261027_115730_notification_settings';
import * as migration_20261027_121131_analytics_settings from './20261027_121131_analytics_settings';
import * as migration_20261028_073341_media_settings from './20261028_073341_media_settings';
import * as migration_20261028_084037_gallery_videos from './20261028_084037_gallery_videos';

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
    name: '20261027_105057_stay_meal_per_night',
  },
  {
    up: migration_20261027_114054_legal_settings.up,
    down: migration_20261027_114054_legal_settings.down,
    name: '20261027_114054_legal_settings',
  },
  {
    up: migration_20261027_115036_legal_effective_date_required.up,
    down: migration_20261027_115036_legal_effective_date_required.down,
    name: '20261027_115036_legal_effective_date_required',
  },
  {
    up: migration_20261027_115730_notification_settings.up,
    down: migration_20261027_115730_notification_settings.down,
    name: '20261027_115730_notification_settings',
  },
  {
    up: migration_20261027_121131_analytics_settings.up,
    down: migration_20261027_121131_analytics_settings.down,
    name: '20261027_121131_analytics_settings',
  },
  {
    up: migration_20261028_073341_media_settings.up,
    down: migration_20261028_073341_media_settings.down,
    name: '20261028_073341_media_settings',
  },
  {
    up: migration_20261028_084037_gallery_videos.up,
    down: migration_20261028_084037_gallery_videos.down,
    name: '20261028_084037_gallery_videos'
  },
];
