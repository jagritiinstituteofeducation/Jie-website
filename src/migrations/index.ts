import * as migration_20260925_035359_initial from './20260925_035359_initial';
import * as migration_20260927_163839_home_backgrounds from './20260927_163839_home_backgrounds';

export const migrations = [
  {
    up: migration_20260925_035359_initial.up,
    down: migration_20260925_035359_initial.down,
    name: '20260925_035359_initial',
  },
  {
    up: migration_20260927_163839_home_backgrounds.up,
    down: migration_20260927_163839_home_backgrounds.down,
    name: '20260927_163839_home_backgrounds'
  },
];
