const setSession = (name, value) => {
  return sessionStorage.setItem(name, value);
};

const getSession = (name) => {
  return sessionStorage.getItem(name);
};

const clearSession = () => {
  return sessionStorage.clear();
};

export { setSession, getSession, clearSession };
