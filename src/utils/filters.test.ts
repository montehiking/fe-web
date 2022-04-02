import { Point } from 'src/types';
import { dehydrate, hydrate } from 'src/utils/filters';

const points: Point[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [19.091258949410722, 42.24619402714383],
    },
    properties: {
      title: 'Most na Crmnici',
      description: 'старинный мост',
      category: 'bridge',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [19.091367718576958, 43.14370625468662],
    },
    properties: {
      title: 'Titova pećina',
      description: 'пещера',
      category: 'cave',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [18.826982975006104, 42.275133659000936],
    },
    properties: {
      title: 'Tvrđava Mogren',
      description: 'австро-венгерский форт',
      category: 'fortress',
    },
  },
];

describe('Dehydrate filters state', () => {
  test('An undefined value will return an empty object', () => {
    expect(dehydrate(undefined as never)).toEqual([]);
  });

  test('An empty value will return an empty object', () => {
    expect(dehydrate({})).toEqual([]);
  });

  test('a normal value will return a normalized object', () => {
    expect(
      dehydrate({
        bridge: { checked: true, count: 1 },
        cave: { checked: false, count: 2 },
        fortress: { checked: true, count: 1 },
      })
    ).toEqual(['cave']);
  });
});

describe('Hydrate filters state', () => {
  test('[user] An undefined value will recalculate the state', () => {
    expect(hydrate(points, undefined as never)).toEqual({
      bridge: { checked: true, count: 1 },
      cave: { checked: true, count: 1 },
      fortress: { checked: true, count: 1 },
    });
  });

  test('[user] An empty value will recalculate the state', () => {
    expect(hydrate(points, [])).toEqual({
      bridge: { checked: true, count: 1 },
      cave: { checked: true, count: 1 },
      fortress: { checked: true, count: 1 },
    });
  });

  test('[user] The dehydrogenated value will be merged with the calculated state', () => {
    expect(hydrate(points, ['cave'])).toEqual({
      bridge: { checked: true, count: 1 },
      cave: { checked: false, count: 1 },
      fortress: { checked: true, count: 1 },
    });
  });
});
