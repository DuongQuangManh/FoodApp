import { Dimensions } from 'react-native'
export const WINDOW_WIDTH = Dimensions.get('window').width
export const WINDOW_HEIGHT = Dimensions.get('window').height
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /((09|03|07|08|05)+([0-9]{8})\b)/;