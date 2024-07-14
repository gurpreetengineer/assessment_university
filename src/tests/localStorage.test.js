import * as localStorageUtils from '../utils/localStorage';

describe('localStorageUtils', () => {
  let setItemMock, getItemMock, removeItemMock;

  beforeEach(() => {
    setItemMock = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
    getItemMock = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {});
    removeItemMock = jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clears all mocks to prevent cross-test contamination
  });

  describe('saveToLocalStorage', () => {
    it('should save data to local storage', () => {
      const STORAGE_KEY = 'test_key';
      const data = { name: 'Test University' };

      localStorageUtils.saveToLocalStorage(STORAGE_KEY, data);

      expect(setItemMock).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify(data));
    });
  });

  describe('getFromLocalStorage', () => {
    it('should get data from local storage if it exists', () => {
      const STORAGE_KEY = 'test_key';
      const data = { name: 'Test University' };

      getItemMock.mockReturnValue(JSON.stringify(data));

      const result = localStorageUtils.getFromLocalStorage(STORAGE_KEY);

      expect(getItemMock).toHaveBeenCalledWith(STORAGE_KEY);
      expect(result).toEqual(data);
    });

    it('should return null if no data found in local storage', () => {
      const STORAGE_KEY = 'test_key';

      getItemMock.mockReturnValue(null);

      const result = localStorageUtils.getFromLocalStorage(STORAGE_KEY);

      expect(getItemMock).toHaveBeenCalledWith(STORAGE_KEY);
      expect(result).toBeNull();
    });
  });

  describe('removeItemFromLocalStorage', () => {
    it('should remove item from local storage', () => {
      const STORAGE_KEY = 'test_key';

      localStorageUtils.removeItemFromLocalStorage(STORAGE_KEY);

      expect(removeItemMock).toHaveBeenCalledWith(STORAGE_KEY);
    });
  });
});
