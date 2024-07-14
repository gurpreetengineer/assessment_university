import axios from 'axios';
import { fetchData } from '../services/apiService';

jest.mock('axios');

describe('fetchData', () => {
  beforeEach(() => {
    console.error = jest.fn();
  })
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch data successfully', async () => {
    const mockData = [{ name: 'University A' }, { name: 'University B' }];
    axios.get.mockResolvedValueOnce({ data: mockData });

    const data = await fetchData();

    expect(data).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('http://universities.hipolabs.com/search?country=United%20Arab%20Emirates');
  });

  it('should handle error when fetching data', async () => {
    const errorMessage = 'Failed to fetch data';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(fetchData()).rejects.toThrow(errorMessage);
    expect(axios.get).toHaveBeenCalledWith('http://universities.hipolabs.com/search?country=United%20Arab%20Emirates');
  });
});

describe('apiService', () => {
  it('should fetch data from API', async () => {
    const mockData = { data: [{ name: 'Test University' }] };
    axios.get.mockResolvedValue(mockData);

    const result = await fetchData();

    expect(result).toEqual(mockData.data);
    expect(axios.get).toHaveBeenCalledWith('http://universities.hipolabs.com/search?country=United%20Arab%20Emirates');
  });

  it('should throw an error if API call fails', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValue(new Error(errorMessage));

    await expect(fetchData()).rejects.toThrow(errorMessage);
  });
});
