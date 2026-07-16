import { CATEGORY_COLORS } from '../theme/colors';

export interface KapitelTabBarSchema {
    label: string;
    colorItem: string;
    background: any;
}

export const tabBarStruktur: Record < string, KapitelTabBarSchema > = {
    '1': {
        label: CATEGORY_COLORS['1'].label,
        colorItem: CATEGORY_COLORS['1'].base,
        background: require('../assets/backgrounds/cat1-alltag.jpg'),
    },
    '2': {
        label: CATEGORY_COLORS['2'].label,
        colorItem: CATEGORY_COLORS['2'].base,
        background: require('../assets/backgrounds/cat2-gebet.jpg'),
    },
    '3': {
        label: CATEGORY_COLORS['3'].label,
        colorItem: CATEGORY_COLORS['3'].base,
        background: require('../assets/backgrounds/cat3-reisen.jpg'),
    },
    '4': {
        label: CATEGORY_COLORS['4'].label,
        colorItem: CATEGORY_COLORS['4'].base,
        background: require('../assets/backgrounds/cat4-schutz.jpg'),
    },
    '5': {
        label: CATEGORY_COLORS['5'].label,
        colorItem: CATEGORY_COLORS['5'].base,
        background: require('../assets/backgrounds/cat5-hilfe.jpg'),
    },
    '6': {
        label: CATEGORY_COLORS['6'].label,
        colorItem: CATEGORY_COLORS['6'].base,
        background: require('../assets/backgrounds/cat6-wohlsein.jpg'),
    },
    '7': {
        label: CATEGORY_COLORS['7'].label,
        colorItem: CATEGORY_COLORS['7'].base,
        background: require('../assets/backgrounds/cat7-pilgern.jpg'),
    },
};
