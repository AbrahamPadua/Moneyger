import Swal from "sweetalert2";
import { API, JSONPOST } from "../app-helper";
import JWTStorage from "./JWTStorage";
import Router from "next/router";
import _ from "lodash";
import client from "../graphql/client";
import { addC } from "../graphql/mutations";
import { CsQuery } from "../graphql/queries";

const categoryProvider = {
  createCategory: async (newC) => {
    try {
      newC.name = _.capitalize(newC.name);

      const uid = localStorage.getItem("uid");
      const { data } = await client.mutate({
        mutation: addC,
        variables: { uid, input: newC },
      });

      if (data.addCategory) {
        Swal.fire(
          "Category Added",
          "The new Category has been added",
          "success"
        ).then(() => {
          Router.push("/transactions/new");
        });
      } else {
        Swal.fire("Error", "The Category is already existing", "error");
      }
    } catch (err) {
      console.log(err);
      Swal.fire();
    }
  },

  getCategories: async () => {
    // For handling reload
    // if (!JWTStorage.getToken()) await JWTStorage.getRefreshedToken();

    const uid = localStorage.getItem("uid");
    const { loading, error, data } = await client.query({
      query: CsQuery,
      variables: { uid },
    });

    if (!loading) {
      if (!error) {
        return data.getCategories
      } else {
        console.log(error)
        return null
      }
    }

    return null
  }
};

export default categoryProvider;
