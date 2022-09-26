const TOKEN_LS_ITEM = "token";

export const getToken = () => {
  return window.localStorage.getItem(TOKEN_LS_ITEM);
};
export const setToken = (token: string) => {
  window.localStorage.setItem(TOKEN_LS_ITEM, token);
};
export const deleteToken = () => {
  window.localStorage.removeItem(TOKEN_LS_ITEM);
};
