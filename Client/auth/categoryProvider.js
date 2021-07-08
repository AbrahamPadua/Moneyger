import Swal from "sweetalert2";
import { API, JSONPOST } from "../app-helper";
import JWTStorage from "./JWTStorage";
import Router from "next/router";
import _ from "lodash";

const categoryProvider = {
  createCategory: async (newCategory) => {
    try {
      newCategory.name = _.capitalize(newCategory.name)
      const res = await fetch(
        `${API}/users/add-category`,
        JSONPOST(newCategory, {
          Authorization: `Bearer ${JWTStorage.getToken()}`,
        })
      );

      const data = await res.text();

      if (res.status < 400) {
        Swal.fire(
          "Category Added",
          "The new Category has been added",
          "success"
        ).then(() => {
          Router.push("/transactions/new");
        });
      } else {
        console.log(data);
        Swal.fire("Error", data, "error");
      }
    } catch (err) {
      console.log(err);
      Swal.fire();
    }
  },
  getCategories: async () => {
    // For handling reload
    // if (!JWTStorage.getToken()) await JWTStorage.getRefreshedToken();

    const res = await fetch(`${API}/users/category`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JWTStorage.getToken()}`,
      },
      credentials: "include",
    });
    const data = await res.json();

    // IF SUCCESS
    if (res.status < 400) {
      return data.data;
    }
    // If FAILED
    console.log(data);
    return null;
  },
  visualizeCategories: async () => { },
};

export default categoryProvider;
