import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function AdminLogin() {

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();


  async function login(e) {

  e.preventDefault();


  try {

    const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          password
        })

      }
    );


    const data = await response.json();


    if (!response.ok) {

      setError(data.message);

      return;

    }


    localStorage.setItem(
      "adminToken",
      data.token
    );


    localStorage.setItem(
      "adminLoggedIn",
      "true"
    );


    navigate("/admin/orders");


  } catch(error) {

    console.error(error);

    setError("Could not connect to server");

  }

}


  return (

    <section className="checkout-page">

      <div className="checkout-form">

        <h2>
          Admin Login
        </h2>


        {error && (
          <p className="error-message">
            {error}
          </p>
        )}


        <form onSubmit={login}>


          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />


          <button>
            Login
          </button>


        </form>


      </div>

    </section>

  );

}


export default AdminLogin;