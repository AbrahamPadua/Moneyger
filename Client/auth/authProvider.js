import JWTStorage from "./JWTStorage";
import { API } from "../app-helper";
import Router from "next/router";
import Swal from "sweetalert2";

// To reduce redundancy in fetch requests
const JSONPOST = (body, extra) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
  ...extra,
});

const authProvider = {
  register: async ({ user, setUser }) => {
    // Checking empty fields
    for (let key of Object.keys(user)) {
      if (user[key] === "") {
        Swal.fire({
          icon: "error",
          title: "",
          text: `${key} hasn't been filled out.`,
        });
        return;
      }
    }

    // Final Check (PASSWORD)
    if (user.vPassword !== user.password) {
      Swal.fire({ icon: "error", text: "Password are not the same" });
      return;
    }

    let reg = /^(?=.{8,15})(?=.*[\w])(?=.*[^\w]).*$/gi;
    if (!reg.test(user.password)) {
      Swal.fire({
        icon: "error",
        text: "Password should be at least 8 characters with at least one special character.",
      });
      return;
    }
    // localStorage.setItem("email", email);

    try {
      const res = await fetch(`${API}/users/register`, {
        ...JSONPOST({ ...user, loginType: "form" }),
      });

      if (res.status < 400) {
        alert("Succesfully Registered User!");

        // Reseting all the input fields
        for (let key of Object.keys(user)) {
          setUser({ [key]: "", ...user });
        }

        Router.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: await res.text(),
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message,
      });
      console.clear();
    }
  },

  login: async (e, user) => {
    e.preventDefault();

    const reg = /^(?=.*@)(?=.*\.).*$/i;
    if (!reg.test(user.email)) {
      Swal.fire("Invalid Email", "Please provide a valid email.", "error");
      return;
    }

    const res = await fetch(`${API}/users/login`, {
      ...JSONPOST({ ...user, loginType: "form" }, { credentials: "include" }),
    });

    if (res.status < 400) {
      const { data } = await res.json();
      JWTStorage.setToken(data.accessToken, data.tokenExpiry);
      global.window && localStorage.setItem("loggedIn", true);
      Router.push("/dashboard");
    } else {
      Swal.fire("Login Failed", await res.text(), "error");
      console.clear();
      return false;
    }
  },

  loginGoogle: async (response) => {
    if (response.error) return;
    const res = await fetch(`${API}/users/login`, {
      ...JSONPOST(
        { ...response, loginType: "google" },
        { credentials: "include" }
      ),
    });

    if (res.status < 400) {
      const { data } = await res.json();
      JWTStorage.setToken(data.accessToken, data.tokenExpiry);
      global.window && localStorage.setItem("loggedIn", true);
      Router.push("/dashboard");
      return;
    } else {
      console.clear();
    }
  },

  isLoggedIn: () => {
    if (!Boolean(JWTStorage.getToken())) {
      return (
        // Again, this is just a workaround to just load on the browser.
        global.window && localStorage.getItem("loggedIn")
      );
    }
    return true;
  },

  getDetails: async (token) => {
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const res = await fetch(`${API}/users/details`, options);
    const data = await res.json();
    // setUser({ id: data._id, isAdmin: data.isAdmin });
    return data;
  },

  logout: async () => {
    await fetch(
      `${API}/users/logout`,
      JSONPOST({}, { credentials: "include" })
    );
    JWTStorage.eraseToken();
    global.window && localStorage.removeItem("loggedIn");
    return Promise.resolve();
  },

  checkAuth: async () => {
    await JWTStorage.handleReload();
  },
};

export default authProvider;
