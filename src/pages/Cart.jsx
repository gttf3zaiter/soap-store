import { Link } from "react-router-dom";


function Cart({ cart, setCart }) {


  const productsTotal = cart.reduce(
  (sum, item) =>
    sum + item.price * item.quantity,
  0
);

const deliveryFee = 3;

const total = productsTotal + deliveryFee;

  function removeItem(id) {

    setCart(
      cart.filter(item => item.id !== id)
    );

  }


  return (

    <section className="cart-page">


      <h2>Your Cart</h2>


      {cart.length === 0 ? (

        <div className="empty-cart">

          <h3>Your cart is empty</h3>

          <p>
            Add some products before checkout.
          </p>

          <Link to="/shop">
            <button>
              Continue Shopping
            </button>
          </Link>

        </div>


      ) : (


        <>

          <div className="cart-items">


            {cart.map((item) => (


              <div 
                className="cart-item"
                key={item.id}
              >


                <img
                  src={item.image}
                  alt={item.name}
                />


                <div>

                  <h3>
                    {item.name}
                  </h3>


                  <p>
                    Quantity: {item.quantity}
                  </p>


                  <p>
                    Price: ${item.price}
                  </p>


                  <strong>
                    Subtotal: ${item.price * item.quantity}
                  </strong>


               
                 

                </div>


                <button
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>


              </div>


            ))}


          </div>



          <div className="cart-summary">


          <p>
  Products Total: ${productsTotal}
</p>

<p>
  Delivery Fee: ${deliveryFee}
</p>

<h2>
  Final Total: ${total}
</h2>


            <Link to="/checkout">

              <button>
                Checkout
              </button>

            </Link>


          </div>


        </>


      )}


    </section>

  );

}


export default Cart;