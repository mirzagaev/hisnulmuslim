import axios from 'axios';

const API_URL = 'https://admin.hisnulmuslim.de/api/';

export const getBittgebete = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
};