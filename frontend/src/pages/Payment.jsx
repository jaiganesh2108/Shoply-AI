import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPayment } from "../api/payments";

function Payment() {

    const { orderId } = useParams();

    const navigate = useNavigate();

    const [method, setMethod] = useState("ONLINE");

    const handlePayment = async () => {

        try {

            await createPayment({

                order: orderId,

                payment_method: method,

            });

            alert("Payment Successful!");

            navigate("/orders");

        }

        catch(error){

            console.error(error.response?.data || error);

            alert("Payment Failed");

        }

    };

    return (

        <div>

            <h1>Payment</h1>

            <select
                value={method}
                onChange={(e)=>setMethod(e.target.value)}
            >

                <option value="ONLINE">
                    Online
                </option>

                <option value="COD">
                    Cash on Delivery
                </option>

            </select>

            <br /><br />

            <button onClick={handlePayment}>
                Pay Now
            </button>

        </div>

    );

}

export default Payment;