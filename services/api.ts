import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const API_URL = 'https://admin.hisnulmuslim.de/api/';

// Kapiteln (=hm_kategorien)
// - Unterkategorienn (=hm_unterkategorien)
// - - Themen (=hm)
// - - - Bittgebete (=hm_duas)  [nicht implementiert!]

export const getHMStruktur = async () => {
    const response = await axios.get(`${API_URL}?structure=1`);
    await AsyncStorage.setItem('kapiteln', JSON.stringify(response.data));
    return response.data;
};

export const getKategorieData = async ()  => {
    const response = await axios.get(`${API_URL}`);
    // const response = await axios.get(`${API_URL}/?t=hm&kategorie=`+id);
    await AsyncStorage.setItem('kapiteln', JSON.stringify(response.data));
    return response.data;
};

export const getBittgebete = async () => {
    const response = await axios.get(`${API_URL}/?t=bittgebete`);
    await AsyncStorage.setItem('items', JSON.stringify(response.data));
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