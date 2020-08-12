export const sessionStorageIsSupported = (): boolean => {
  try {
    const testKey = '__TEST_KEY__';
    sessionStorage.setItem(testKey, testKey);
    sessionStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};
