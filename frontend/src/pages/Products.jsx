import { useEffect } from "react";
import api from "../api/axios";

function Products() {
  useEffect(() => {
    api.get("products/")
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);

  return <h2>Products Page</h2>;
}

export default Products;