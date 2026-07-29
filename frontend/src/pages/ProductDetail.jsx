import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/products";

function ProductDetail() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const data = await getProduct(id);
            setProduct(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!product) {
        return <h2>Product not found.</h2>;
    }

    return (
        <div>
            <h1>{product.name}</h1>

            <p>{product.description}</p>

            <h2>₹ {product.price}</h2>

            <p>Category: {product.category}</p>

            <p>Stock: {product.stock}</p>

            <button>Add to Cart</button>
        </div>
    );
}

export default ProductDetail;