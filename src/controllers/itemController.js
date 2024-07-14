import { fetchData } from '../services/apiService';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage';

export const getItems = async () => {
  try {
    const data = await fetchData();
    saveToLocalStorage(process.env.REACT_APP_STORAGE_KEY_ONE, data);
    return data;
  } catch (error) {
    const localData = getFromLocalStorage(process.env.REACT_APP_STORAGE_KEY_ONE);
    if (localData) return localData;
    throw error;
  }
};
