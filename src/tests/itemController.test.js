import { getItems } from '../controllers/itemController';
import * as apiService from '../services/apiService';
import * as localStorageUtils from '../utils/localStorage';

jest.mock('../services/apiService');
jest.mock('../utils/localStorage');

describe('itemController', () => {
  beforeEach(() => {
    console.error = jest.fn();
    jest.clearAllMocks(); // Clear all mocks before each test
  });

  it('should fetch data from API and save to local storage', async () => {
    const mockData = [{ name: 'Test University' }];
    apiService.fetchData.mockResolvedValue(mockData);

    const result = await getItems();

    expect(result).toEqual(mockData);
    expect(localStorageUtils.saveToLocalStorage).toHaveBeenCalledWith(process.env.REACT_APP_STORAGE_KEY_ONE, mockData);
  });

  it('should fetch data from local storage if API call fails', async () => {
    const mockData = [{ name: 'Test University' }];
    apiService.fetchData.mockRejectedValue(new Error('API Error'));
    localStorageUtils.getFromLocalStorage.mockReturnValue(mockData);

    const result = await getItems();

    expect(result).toEqual(mockData);
  });

  it('should throw error if both API call and local storage retrieval fail', async () => {
    apiService.fetchData.mockRejectedValue(new Error('API Error'));
    localStorageUtils.getFromLocalStorage.mockReturnValue(null);

    await expect(getItems()).rejects.toThrow('API Error');
  });
});
