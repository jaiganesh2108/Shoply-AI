import { useEffect, useState } from "react";
import { getProducts } from "../api/products";


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

                        <h2>
                            {product.name}
                        </h2>


                        <p>
                            {product.description}
                        </p>


                        <h3>
                            ₹ {product.price}
                        </h3>


                        <p>
                            Stock: {product.stock}
                        </p>


                    </div>

                ))
            }


        </div>

    );

}


export default Products;