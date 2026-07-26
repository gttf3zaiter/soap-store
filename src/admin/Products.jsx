import { useState } from "react";


function Products() {

  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function addProduct(e) {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      ...form
    };

    setProducts([...products, newProduct]);

    setForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      image: ""
    });
  }

  return (
    <section>

      <h2>Products</h2>

      <form onSubmit={addProduct}>

        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />

        <button type="submit">
          Add Product
        </button>

      </form>

      <hr />

      {products.length === 0 ? (
        <p>No products added.</p>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #444",
              padding: "15px",
              marginBottom: "15px"
            }}
          >
            <h3>{product.name}</h3>

            <p>{product.description}</p>

            <p>Price: ${product.price}</p>

            <p>Stock: {product.stock}</p>

            <p>{product.image}</p>
          </div>
        ))
      )}

    </section>
  );
}

export default Products;