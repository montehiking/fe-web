type Key = 'filters';

export const getItem = <T>(name: Key, defaultValue?: T): T => {
  try {
    const result = localStorage.getItem(name);

    if (result) {
      return JSON.parse(result);
    }
  } catch (e) {
    // ignore
  }

  return (defaultValue || {}) as T;
};

export const setItem = <T>(name: Key, data: T): void => {
  try {
    localStorage.setItem(name, JSON.stringify(data));
  } catch (e) {
    // ignore
  }
};
