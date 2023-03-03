import L, { IconOptions, LatLngExpression, latLng, tileLayer } from 'leaflet';

export const defaultTitleLayer = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

export const defaultCoordinates = latLng(5.825412020138948, -4.3404471139060234);

export const leafletHousingIcon = (options?: IconOptions) => L.icon({
  iconUrl: 'assets/media/icons/duotune/maps/map008.svg',
  iconSize:     [40, 95],
  iconAnchor:   [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor:  [-3, -76],
  ...options,
});

export const getUserCoordinates = (): Promise<LatLngExpression> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      resolve(defaultCoordinates)
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(latLng(position.coords.latitude, position.coords.longitude));
        },
        (error) => {
          resolve(defaultCoordinates);
        }
      );
    }
  });
}
