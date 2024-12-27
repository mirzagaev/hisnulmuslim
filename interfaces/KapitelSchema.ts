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
        icon: require('../assets/icons/01-inactive.png'),
        iconActive: require('../assets/icons/01-active.png'),
    },
    '2': {
        label: 'Gebet',
        colorItem: '#2483d3',
        icon: require('../assets/icons/02-inactive.png'),
        iconActive: require('../assets/icons/02-active.png'),
    },
    '3': {
        label: 'Reisen',
        colorItem: '#7e57d6',
        icon: require('../assets/icons/03-inactive.png'),
        iconActive: require('../assets/icons/03-active.png'),
    },
    '4': {
        label: 'Schutz',
        colorItem: '#b41ed8',
        icon: require('../assets/icons/04-inactive.png'),
        iconActive: require('../assets/icons/04-active.png'),
    },
    '5': {
        label: '1. Hilfe',
        colorItem: '#c61fb7',
        icon: require('../assets/icons/05-inactive.png'),
        iconActive: require('../assets/icons/05-active.png'),
    },
    '6': {
        label: 'Trauer',
        colorItem: '#e21f87',
        icon: require('../assets/icons/06-inactive.png'),
        iconActive: require('../assets/icons/06-active.png'),
    },
    '7': {
        label: 'Pilgern',
        colorItem: '#ef2265',
        icon: require('../assets/icons/07-inactive.png'),
        iconActive: require('../assets/icons/07-active.png'),
    },
};