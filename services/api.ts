import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const API_URL = 'https://admin.hisnulmuslim.de/api/';

// Kapiteln (=hm_kategorien)
// -> Unterkategorienn (=hm_unterkategorien)
//   -> Themen (=hm)
export const getHMStruktur = async () => {
    const response = await axios.get(`${API_URL}?structure=1`);
    await AsyncStorage.setItem('kapiteln', JSON.stringify(response.data));
    return response.data;
};

// Bittgebete (=hm_duas)
export const getBittgebete = async () => {
    const response = await axios.get(`${API_URL}/?t=hm_duas`);
    await AsyncStorage.setItem('duas', JSON.stringify(response.data));
    return response.data;
};

// Bittgebete (=hm_duas)
export const geThemen = async () => {
    const response = await axios.get(`${API_URL}/?t=hm_duas`);
    await AsyncStorage.setItem('duas', JSON.stringify(response.data));
    return response.data;
};

export const getKategorieData = async ()  => {
    const response = await axios.get(`${API_URL}`);
    await AsyncStorage.setItem('themen', JSON.stringify(response.data));
    return response.data;
};

export const syncOfflineData = async () => {
    const isConnected = await NetInfo.fetch().then(state => state.isConnected);

    if (isConnected) {
        const offlineItems = await AsyncStorage.getItem('offlineItems');
        if (offlineItems) {
            const items = JSON.parse(offlineItems);
            // for (const item of items) {
            //     await addItem(item.name);
            // }
            await AsyncStorage.removeItem('offlineItems');
        }
    }
};