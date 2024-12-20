export interface KapitelTabBarSchema {
    label: string;
    colorItem: string;
    icon: any; // Falls du ein präziseres Typing möchtest, kannst du `ImageSourcePropType` aus `react-native` verwenden.
    iconActive: any;
}

export const tabBarStruktur: Record < string, KapitelTabBarSchema > = {
    '1': {
        label: 'Alltag',
        colorItem: '#0dc9ca',
        icon: require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-01.svg'),
        iconActive: require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-01_active.svg'),
    },
    '2': {
        label: 'Gebet',
        colorItem: '#2483d3',
        icon: require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-02.svg'),
        iconActive: require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-02_active.svg'),
    },
    '3': {
        label: 'Reisen',
        colorItem: '#7e57d6',
        icon: require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-03.svg'),
        iconActive: require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-03_active.svg'),
    },
    '4': {
        label: 'Schutz',
        colorItem: '#b41ed8',
        icon: require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-04.svg'),
        iconActive: require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-04_active.svg'),
    },
    '5': {
        label: '1. Hilfe',
        colorItem: '#c61fb7',
        icon: require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-05.svg'),
        iconActive: require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-05_active.svg'),
    },
    '6': {
        label: 'Trauer',
        colorItem: '#e21f87',
        icon: require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-06.svg'),
        iconActive: require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-06_active.svg'),
    },
    '7': {
        label: 'Pilgern',
        colorItem: '#ef2265',
        icon: require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-07.svg'),
        iconActive: require('../assets/icons/HISNUL-MUSLIM-ICONS-active-inactive-V3-07_active.svg'),
    },
};