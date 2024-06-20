import { Appearance } from 'react-native';

export const getOsTheme = () => {
    const colorScheme = Appearance.getColorScheme();
    return colorScheme === 'dark' ? 'dark' : 'light';
};