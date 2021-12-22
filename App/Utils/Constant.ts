import { Platform, Dimensions } from 'react-native';
import { Method } from 'axios';

export const GET: Method = 'GET';
export const POST: Method = 'POST';
export const PUT: Method = 'PUT';
export const PATCH: Method = 'PATCH';
export const DELETE: Method = 'DELETE';

export const isIOS = Platform.OS === 'ios';

export const { height, width } = Dimensions.get('window');

export const aspectRatio = height / width;
export const isiPad = aspectRatio < 1.6;

// Custom Fonts
export const fonts = {
  Regular: { fontFamily: 'Regular' },
  Light: { fontFamily: 'Light' },
  Medium: { fontFamily: 'Medium' },
  oBold: { fontFamily: 'Bold' },
};

// Font Sizes
export const fontSizes = {
  xsmall: 10,
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 18,
  xxlarge: 25,
  xxxlarge: 32,
};
