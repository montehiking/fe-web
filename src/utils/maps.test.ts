import { createGoogleMapsURL, latLngToDMS } from 'src/utils/maps';

describe('Converting latLng to DMS', () => {
  test('zero values return zero coordinate', () => {
    expect(latLngToDMS(0, 0)).toBe('0°0\'0.00"S+0°0\'0.00"W');
  });

  test('real coordinates are converted correctly', () => {
    expect(latLngToDMS(42.297946797761924, 18.84341023914012)).toBe(
      '42°17\'52.61"N+18°50\'36.28"E'
    );
  });
});

describe('createGoogleMapsURL', () => {
  test('function working correctly', () => {
    expect(createGoogleMapsURL(42.399914442570854, 18.8375186920166, 9)).toBe(
      'https://www.google.com/maps/place/42%C2%B023%2759.69%22N+18%C2%B050%2715.07%22E/@42.39991444257085418.8375186920166,9z'
    );
  });
});
