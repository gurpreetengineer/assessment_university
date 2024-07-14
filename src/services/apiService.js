import axios from 'axios';

const API_URL = 'http://universities.hipolabs.com/search?country=United%20Arab%20Emirates';

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};
