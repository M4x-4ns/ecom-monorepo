import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/stripe";
import useEcomStore from "../../store/ecom-store";
import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51RRpFlIBamcLeJghVqt7iEHguyKOzNgWKdf39iTn6byQ4Hd1v4wAydBWPc8aU3jbALb1d3gr8UWX4HRA94qed2wl00T5hNbfHE");

const Payment = () => {
  const token = useEcomStore((s)=>s.token);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    payment(token)
    .then((res)=>{
      console.log(res)
      setClientSecret(res.data.clientSecret)
    })
    .catch((err) => {
      console.log(err)
    });

  },[]);
   const appearance = {
    theme: "stripe",
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";

  return (
    <div>
      {
      clientSecret && (
         <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          <CheckoutForm />
        </Elements>
      )
      }
    </div>
  )
}

export default Payment