import * as migration_20260925_035359_initial from './20260925_035359_initial';
import * as migration_20260927_163839_home_backgrounds from './20260927_163839_home_backgrounds';
import * as migration_20260928_140145_about_hero from './20260928_140145_about_hero';
import * as migration_20261004_082405_university_programs from './20261004_082405_university_programs';

export const migrations = [
  {
    up: migration_20260925_035359_initial.up,
    down: migration_20260925_035359_initial.down,
    name: '20260925_035359_initial',
  },
  {
    up: migration_20260927_163839_home_backgrounds.up,
    down: migration_20260927_163839_home_backgrounds.down,
    name: '20260927_163839_home_backgrounds',
  },
  {
    up: migration_20260928_140145_about_hero.up,
    down: migration_20260928_140145_about_hero.down,
    name: '20260928_140145_about_hero',
  },
  {
    up: migration_20261004_082405_university_programs.up,
    down: migration_20261004_082405_university_programs.down,
    name: '20261004_082405_university_programs'
  },
];
