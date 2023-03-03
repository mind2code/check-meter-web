import L, { IconOptions } from 'leaflet';

export const leafletHousingIcon = (options?: IconOptions) => L.icon({
  iconUrl: 'assets/media/icons/duotune/maps/map008.svg',
  iconSize:     [40, 95],
  iconAnchor:   [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor:  [-3, -76],
  ...options,
});
