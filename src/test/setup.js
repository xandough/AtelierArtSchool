import '@testing-library/jest-dom';

if (typeof globalThis.localStorage === 'undefined') {
  const storage = {};
  globalThis.localStorage = {
    getItem: (key) => storage[key] || null,
    setItem: (key, val) => { storage[key] = String(val); },
    removeItem: (key) => { delete storage[key]; },
    clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
  };
}
