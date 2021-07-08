// FUNCTIONS
import { useEffect, useState } from "react";
import categoryProvider from "../../auth/categoryProvider";
import auth from "../../auth/authProvider";
// COMPONENTS
import Link from "next/link";
import { Table } from "react-bootstrap";
import Dashboard from "../../components/Dashboard/Dashboard";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  // Getting the Categories on first render
  useEffect(async () => {
    await auth.checkAuth();
    const data = await categoryProvider.getCategories();
    if (!data) return;
    const categoryList = data.map(({ _id, name, type }) => {
      return (
        <tr key={_id}>
          {/* To Capitalize the name and type */}
          <td>{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</td>
          <td>{type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}</td>
        </tr>
      );
    });
    setCategories(categoryList);
  }, []);

  return (
    <Dashboard title="Categories">
      <h3>Categories</h3>
      <Link href="/categories/new">
        <a className="btn btn-success mt-1 mb-3">Add</a>
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Category</th>
            <th>Type</th>
          </tr>
          {categories}
        </thead>
        <tbody></tbody>
      </Table>
    </Dashboard>
  );
};

export default Categories;
