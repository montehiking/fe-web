import { Point } from 'src/types';
import {
  dehydrate,
  filterPoints,
  hydrate,
  isPointAllowed,
} from 'src/utils/filters';

const point: Point = {
  lat: 42.24619402714383,
  lng: 19.091258949410722,
  type: 'bridge',
  title: 'Most na Crmnici',
  description: 'старинный мост',
};

const adminPoint: Point = {
  lat: 42.65747657323658,
  lng: 19.32546545876978,
  type: '',
  title: 'Admin point',
  description: 'какая-то точка',
};

const notVerifiedPoint: Point = {
  lat: 42.36710394637622,
  lng: 18.953089730534305,
  type: 'cave',
  title: 'Lipska pećina',
  description: 'пещера',
  notVerified: true,
};

const otherPoints: Point[] = [
  {
    lat: 43.14370625468662,
    lng: 19.091367718576958,
    type: 'cave',
    title: 'Titova pećina',
    description: 'пещера',
  },
  {
    lat: 42.275133659000936,
    lng: 18.826982975006104,
    type: 'fortress',
    title: 'Tvrđava Mogren',
    description: 'австро-венгерский форт',
  },
];

const points: Point[] = [point, adminPoint, notVerifiedPoint, ...otherPoints];

describe('Is point allowed', () => {
  test('[user] Normal point is allowed', () => {
    expect(isPointAllowed(point, false)).toBeTruthy();
  });

  test('[admin] Normal point is allowed', () => {
    expect(isPointAllowed(point, true)).toBeTruthy();
  });

  test('[user] Admin point is not allowed', () => {
    expect(isPointAllowed(adminPoint, false)).toBeFalsy();
  });

  test('[admin] Normal point is allowed', () => {
    expect(isPointAllowed(adminPoint, true)).toBeTruthy();
  });

  test('[user] Not verified point is not allowed', () => {
    expect(isPointAllowed(notVerifiedPoint, false)).toBeFalsy();
  });

  test('[admin] Not verified point is allowed', () => {
    expect(isPointAllowed(notVerifiedPoint, true)).toBeTruthy();
  });
});

describe('Dehydrate filters state', () => {
  test('An undefined value will return an empty object', () => {
    expect(dehydrate(undefined as never)).toEqual({});
  });

  test('An empty value will return an empty object', () => {
    expect(dehydrate({})).toEqual({});
  });

  test('a normal value will return a normalized object', () => {
    expect(
      dehydrate({
        bridge: { checked: true, count: 1 },
        cave: { checked: false, count: 2 },
        fortress: { checked: true, count: 1 },
      })
    ).toEqual({ bridge: true, cave: false, fortress: true });
  });
});

describe('Hydrate filters state', () => {
  test('[user] An undefined value will recalculate the state', () => {
    expect(hydrate(points, undefined as never, false)).toEqual({
      bridge: { checked: true, count: 1 },
      cave: { checked: true, count: 1 },
      fortress: { checked: true, count: 1 },
    });
  });

  test('[admin] An undefined value will recalculate the state', () => {
    expect(hydrate(points, undefined as never, true)).toEqual({
      bridge: { checked: true, count: 1 },
      cave: { checked: true, count: 2 },
      fortress: { checked: true, count: 1 },
      '': { count: 1, checked: true },
    });
  });

  test('[user] An empty value will recalculate the state', () => {
    expect(hydrate(points, {}, false)).toEqual({
      bridge: { checked: true, count: 1 },
      cave: { checked: true, count: 1 },
      fortress: { checked: true, count: 1 },
    });
  });

  test('[admin] An empty value will recalculate the state', () => {
    expect(hydrate(points, {}, true)).toEqual({
      bridge: { checked: true, count: 1 },
      cave: { checked: true, count: 2 },
      fortress: { checked: true, count: 1 },
      '': { count: 1, checked: true },
    });
  });

  test('[user] The dehydrogenated value will be merged with the calculated state', () => {
    expect(hydrate(points, { cave: false }, false)).toEqual({
      bridge: { checked: true, count: 1 },
      cave: { checked: false, count: 1 },
      fortress: { checked: true, count: 1 },
    });
  });

  test('[admin] The dehydrogenated value will be merged with the calculated state', () => {
    expect(hydrate(points, { cave: false }, true)).toEqual({
      bridge: { checked: true, count: 1 },
      cave: { checked: false, count: 2 },
      fortress: { checked: true, count: 1 },
      '': { count: 1, checked: true },
    });
  });
});

describe('Filter points', () => {
  test('[user] Function working correctly', () => {
    expect(filterPoints(points, false)).toEqual([point, ...otherPoints]);
  });

  test('[admin] Function working correctly', () => {
    expect(filterPoints(points, true)).toEqual(points);
  });
});
