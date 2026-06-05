import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;

export default function getAuthToken() {
  const agentInfo = secureLocalStorage.getItem('user-info');
  const token = agentInfo?.access_token;

  if (!token) {
    return null;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    if (payload?.exp && currentTime >= payload.exp) {
      return null;
    }
    if (!payload?.email) {
      return null;
    }
  } catch (e) {
    return null;
  }

  return token;
}
