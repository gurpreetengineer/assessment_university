export const saveToLocalStorage = (STORAGE_KEY, data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getFromLocalStorage = (STORAGE_KEY) => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const removeItemFromLocalStorage = (STORAGE_KEY) => {
  localStorage.removeItem(STORAGE_KEY);
}