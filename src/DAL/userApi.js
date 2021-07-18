import axios from "axios";
import Cookies from "js-cookie";

async function userSignup(resCB, userData) {
  try {
    const res = await axios.post(
      "http://localhost:3001/users/signup",
      userData
    );
    if (resCB) resCB(res.data);
  } catch (err) {
    console.error(err);
    resCB(null);
  }
}

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

async function getUserById(resCB, id) {
  try {
    const res = await axios.get(`http://localhost:3001/users/userId/${id}`);
    resCB(res.data);
  } catch (err) {
    console.log(err);
  }
}

async function getUserDiet(resCB, id) {
  try {
    const res = await axios.get(`http://localhost:3001/users/diet/${id}`);
    resCB(res.data);
  } catch (err) {
    console.log(err);
  }
}

async function updateUser(resCB, userInfo) {
  try {
    const res = await axios.put(`http://localhost:3001/users/updateUser`, userInfo);
    resCB(res.data);
  } catch (err) {
    if (err) throw err;
  }
}

function getCurrentUser() {
  const curUser = Cookies.get("currentuser");

  return curUser ? JSON.parse(curUser)[0] : null;
}

export {
  userLogin,
  userLogout,
  getCurrentUser,
  valdiateSession,
  userSignup,
  getUserById,
  getUserDiet,
  updateUser
};
