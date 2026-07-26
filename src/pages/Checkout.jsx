import { useState } from "react";


function Checkout({ cart }) {


  const [form, setForm] = useState({


    
    name: "",
    phone: "",
    city: "",
    address: "",

  });

const [successMessage, setSuccessMessage] = useState("");
const [errorMessage, setErrorMessage] = useState("");

  const deliveryFee = 3;


  const productsTotal = cart.reduce(

    (sum, item) =>
      sum + item.price * item.quantity,

    0

  );


  const total = productsTotal + deliveryFee;



  function handleChange(e) {

  setErrorMessage("");

  setForm({

    ...form,

    [e.target.name]: e.target.value

  });

}

function validateForm() {

  if (
    !form.name ||
    !form.phone ||
    !form.city ||
    !form.address
  ) {

    setErrorMessage("Please fill all delivery information.");
return false;
    

  }



  const lebanesePhone = /^(03|70|71|76|78|79|81)[0-9]{6}$/;


  const cleanPhone = form.phone.replace(/\s/g, "");



  if (!lebanesePhone.test(cleanPhone)) {

    setErrorMessage(
  "Please enter a valid mobile number."
);

return false;;

  }


  return true;

}

  async function submitOrder(e) {

    e.preventDefault();

if (!validateForm()) {
  return;
}
    try {


      const response = await fetch(
        `${API_URL}/api/orders`,
        {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },


          body: JSON.stringify({

            customer: form,

            items: cart,

            total: total

          })

        }

      );


      const data = await response.json();


      setSuccessMessage("✓ Your order has been received successfully!");

setTimeout(() => {
  setSuccessMessage("");
}, 3000);



      setForm({

        name: "",
        phone: "",
        city: "",
        address: ""

      });



    } catch(error) {

      console.error(error);

      alert("Unable to submit order.");

    }

  }



  return (

    <section className="checkout-page">


      <div className="checkout-form">


        <h2>
          Delivery Information
        </h2>


         {successMessage && (
  <div className="success-message">
    {successMessage}
  </div>
)}


{errorMessage && (
  <div className="error-message">
    {errorMessage}
  </div>
)}


        <form onSubmit={submitOrder}>


  <input
    name="name"
    placeholder="Full Name"
    value={form.name}
    onChange={handleChange}
    required
  />


  <input
    name="phone"
    type="tel"
    inputMode="numeric"
    placeholder="Phone Number (03xxxxxx)"
    value={form.phone}
    onChange={(e) => {

  setErrorMessage("");

  const value = e.target.value
    .replace(/\D/g, "")
    .slice(0, 8);


  setForm({
    ...form,
    phone: value
  });

}}
    required
  />


  <input
    name="city"
    placeholder="City"
    value={form.city}
    onChange={handleChange}
    required
  />


  <input
    name="address"
    placeholder="Full Address"
    value={form.address}
    onChange={handleChange}
    required
  />


  <button>
    Place Order
  </button>


</form>


      </div>




      <div className="order-summary">


        <h2>
          Your Order
        </h2>



        {cart.map(item => (

          <div 
            className="summary-item"
            key={item.id}
          >

            <span>
              {item.name}
              {" "}x{item.quantity}
            </span>


            <span>
              ${item.price * item.quantity}
            </span>


          </div>

        ))}



        <hr />


        <p>
          Products: ${productsTotal}
        </p>


        <p>
          Delivery: ${deliveryFee}
        </p>


        <h3>
          Total: ${total}
        </h3>


      </div>


    </section>

  );

}


export default Checkout;