import { useState } from "react";

function ProductCard({ product, addToCart }) {

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {

  addToCart(product, quantity);

  setAdded(true);

  setTimeout(() => {
    setAdded(false);
  }, 2000);

}

  return (

    <div className="product-card">

      <div className="product-image">

        <img
          src={product.image}
          alt={product.name}
        />

      </div>


      <div className="product-info">

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <strong>${product.price}</strong>


        <div className="quantity-selector">

          <button
            type="button"
            onClick={() =>
              setQuantity(Math.max(1, quantity - 1))
            }
          >
            −
          </button>

          <span>{quantity}</span>

          <button
            type="button"
            onClick={() =>
              setQuantity(quantity + 1)
            }
          >
            +
          </button>

        </div>


        <button
          className={`add-cart-button ${added ? "added" : ""}`}
          onClick={handleAddToCart}
        >
          {added ? "✓ Added!" : "Add to Cart"}
        </button>


        {added && (

          <p className="added-message">

            Product added to cart.

          </p>

        )}

      </div>

    </div>

  );

}

export default ProductCard;