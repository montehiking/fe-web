import { bridge } from 'src/data/points/bridge';
import { cave } from 'src/data/points/cave';
import { christian } from 'src/data/points/christian';
import { fortress } from 'src/data/points/fortress';
import { lighthouse } from 'src/data/points/lighthouse';
import { monument } from 'src/data/points/monument';
import { nature } from 'src/data/points/nature';
import { old_town } from 'src/data/points/old_town';
import { other } from 'src/data/points/other';
import { palace } from 'src/data/points/palace';
import { waterfall } from 'src/data/points/waterfall';
import { Point } from 'src/types';

export const points: Point[] = [
  ...bridge,
  ...cave,
  ...christian,
  ...fortress,
  ...lighthouse,
  ...monument,
  ...nature,
  ...old_town,
  ...other,
  ...palace,
  ...waterfall,
];
