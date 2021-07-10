import JWTStorage from "./providers/JWTStorage";

const API =
  process.env.NEXT_PUBLIC_ENDPOINT ||
  `https://zuitt-budget-tracker-server.herokuapp.com/api`;
// For handling Forms
const inputHandler = (e, state, setState) => {
  const name = e.target.name;
  const value = e.target.value;
  setState({ ...state, [name]: value });
};
// To reduce redundancy in fetch requests
const JSONPOST = (body, headers, extra) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    ...headers,
  },
  body: JSON.stringify(body),
  ...extra,
});
const JSONPOSTAUTH = (body, headers, extra) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JWTStorage.getToken()}`,
    ...headers,
  },
  body: JSON.stringify(body),
  ...extra,
});
const POSTAUTH = (headers) => ({
  method: "POST",
  headers: {
    Authorization: `Bearer ${JWTStorage.getToken()}`,
  },
  ...headers,
});

export { API, inputHandler, JSONPOST, JSONPOSTAUTH, POSTAUTH };
