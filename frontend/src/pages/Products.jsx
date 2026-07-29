import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { Link } from "react-router-dom";


function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    };

    if(loading){
        return <h2>Loading products...</h2>;
    }

    return (
        <div>
            <h1>
                Products
            </h1>
            {
                products.map((product)=>(
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <h3>₹ {product.price}</h3>
                        <p>Stock: {product.stock}</p>
                        <Link to={`/products/${product.id}`}>
                            View Details
                        </Link>
                    </div>
                ))
            }
        </div>
    );
}

export default Products;