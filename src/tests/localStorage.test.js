import * as localStorageUtils from '../utils/localStorage';

// Mocking localStorage
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn()
};

describe('localStorageUtils', () => {
  beforeEach(() => {
    console.error = jest.fn();
  })
  afterEach(() => {
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();
    localStorage.removeItem.mockClear();
  });

  describe('saveToLocalStorage', () => {
    it('should save data to local storage', () => {
      const STORAGE_KEY = 'test_key';
      const data = { name: 'Test University' };

      localStorageUtils.saveToLocalStorage(STORAGE_KEY, data);

      expect(localStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify(data));
    });
  });

  describe('getFromLocalStorage', () => {
    it('should get data from local storage if it exists', () => {
      const STORAGE_KEY = 'test_key';
      const data = { name: 'Test University' };

      localStorage.getItem.mockReturnValue(JSON.stringify(data));

      const result = localStorageUtils.getFromLocalStorage(STORAGE_KEY);

      expect(localStorage.getItem).toHaveBeenCalledWith(STORAGE_KEY);
      expect(result).toEqual(data);
    });

    it('should return null if no data found in local storage', () => {
      const STORAGE_KEY = 'test_key';

      localStorage.getItem.mockReturnValue(null);

      const result = localStorageUtils.getFromLocalStorage(STORAGE_KEY);

      expect(localStorage.getItem).toHaveBeenCalledWith(STORAGE_KEY);
      expect(result).toBeNull();
    });
  });

  describe('removeItemFromLocalStorage', () => {
    it('should remove item from local storage', () => {
      const STORAGE_KEY = 'test_key';

      localStorageUtils.removeItemFromLocalStorage(STORAGE_KEY);

      expect(localStorage.removeItem).toHaveBeenCalledWith(STORAGE_KEY);
    });
  });
});
