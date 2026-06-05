import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;

export default function TokenDecrypt() {
  const agentInfo = secureLocalStorage.getItem('user-info');
  const token = agentInfo?.access_token;
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token?.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  const jwt = parseJwt(token);
  const userInfo = jwt;
  return userInfo;
}
