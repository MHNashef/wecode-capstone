import axios from "axios";
import Cookies from "js-cookie";

async function userLogin(resCB, creds) {
  try {
    const res = await axios.post("http://localhost:3001/users/login", creds);
    resCB(res.data);
  } catch (err) {
    console.error(err);
    resCB(null);
  }
}

async function userLogout(creds) {
  try {
    const res = await axios.post("http://localhost:3001/users/logout", creds);
  } catch (err) {
    console.error(err);
  }
}

async function valdiateSession(resCB, creds) {
  try {
    const res = await axios.post(
      "http://localhost:3001/users/validatesession",
      creds
    );
    resCB(res.data);
  } catch (err) {
    console.error(err);
    resCB(null);
  }
}

function getCurrentUser() {
  const curUser = Cookies.get("currentuser");

  return curUser ? JSON.parse(curUser)[0] : null;
}

export { userLogin, userLogout, getCurrentUser, valdiateSession };