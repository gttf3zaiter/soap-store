import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { API_URL } from "../config";

function Shop({ addToCart }) {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {

 
fetch(`${API_URL}/api/products`)
      .then((response) => {

        if (!response.ok) {
          throw new Error("Backend not responding");
        }

        return response.json();

      })
      .then((data) => {

        console.log("Products received:", data);

        setProducts(data);

      })
      .catch((error) => {

        console.error(error);

        setError("Could not load products.");

      });

  }, []);


  return (

    <section className="shop-page">

      <h2>Shop</h2>

      {error && <p>{error}</p>}


      <div className="products-grid">

        {products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />

        ))}

      </div>


      {products.length === 0 && !error && (
        <p>No products found.</p>
      )}

    </section>

  );

}

export default Shop;