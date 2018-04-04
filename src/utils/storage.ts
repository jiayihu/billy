const isAvailable: boolean = (function isAvailableIffe() {
  const test = 'test';
  try {
    window.localStorage.setItem(test, test);
    window.localStorage.getItem(test);
    window.localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
})();

export default {
  getItem(key: string): any {
    if (isAvailable) {
      try {
        return JSON.parse(window.localStorage.getItem(key));
      } catch (e) {
        console.error('Could not get to localStorage: ', e);
        return null;
      }
    }

    return null;
  },

  setItem(key: string, value: any): any {
    if (isAvailable) {
      try {
        return window.localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.error('Could not save to localStorage: ', e);
        return null;
      }
    }

    return null;
  },

  removeItem(key: string): boolean {
    if (isAvailable) {
      window.localStorage.removeItem(key);
      return true;
    }

    return false;
  }
};
