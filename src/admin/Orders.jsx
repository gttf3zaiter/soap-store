import { useEffect, useState } from "react";
import "./Orders.css";

import { API_URL } from "../config";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [activePanel, setActivePanel] = useState("new");



  useEffect(() => {

 

fetch(`${API_URL}/api/orders`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`
    }
  })
    .then(res => res.json())
    .then(data => {

      console.log("SERVER RESPONSE:", data);

      if (!Array.isArray(data)) {
        console.error("Expected orders array but got:", data);
        return;
      }

      const formattedOrders = data.map(order => ({
        ...order,
        status:
          order.status?.toLowerCase() === "pending"
            ? "new"
            : order.status?.toLowerCase() || "new"
      }));

      setOrders(formattedOrders);

    })
    .catch(error => {

      console.error("ORDER FETCH ERROR:", error);

    });

}, []);



  function copyOrder(order) {

    let text = `
SOAP STORE
================

ORDER #${order.id}

CUSTOMER
Name: ${order.customer.name}
Phone: ${order.customer.phone}

DELIVERY
City: ${order.customer.city}
Address: ${order.customer.address}

ITEMS
================
`;


    let subtotal = 0;


    order.items.forEach(item => {

      const itemTotal = item.price * item.quantity;

      subtotal += itemTotal;


      text += `
${item.name}
Quantity: ${item.quantity}
Unit Price: $${item.price}
Subtotal: $${itemTotal}
`;

    });



    const deliveryFee = 3;


    text += `
================

Products Total: $${subtotal}
Delivery Fee: $${deliveryFee}

FINAL TOTAL: $${subtotal + deliveryFee}
`;



    navigator.clipboard.writeText(text);

    alert("Order copied");

  }





  async function updateStatus(id, newStatus) {

  try {

    const response = await fetch(
      `${API_URL}/api/orders/${id}/status`,
      {
        method: "PUT",
headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`
},

        body: JSON.stringify({
          status: newStatus
        })

      }
    );


    const updatedOrder = await response.json();


    setOrders(
      orders.map(order =>
        order.id === id
          ? {
              ...order,
              status: updatedOrder.status
            }
          : order
      )
    );


  } catch(error) {

    console.error(
      "STATUS UPDATE ERROR:",
      error
    );

  }

}





  function OrderCard({ order }) {


    return (

      <div className="receipt">


        <h1>
          SOAP STORE
        </h1>


        <h3>
          Order #{order.id}
        </h3>



        <div className={`status ${order.status}`}>

          {order.status.toUpperCase()}

        </div>



        <hr />



        <h4>
          Customer
        </h4>


        <p>
          Name: {order.customer.name}
        </p>


        <p>
          Phone: {order.customer.phone}
        </p>

<p>
  City: {order.customer.city}
</p>

<p>
  Address: {order.customer.address}
</p>

<p>
  Date: {order.date}
</p>


        <h4>
          Items
        </h4>



        {order.items.map((item,index)=>(

          <div className="item" key={index}>

            <p>
              {item.name}
            </p>


            <p>
              Quantity: {item.quantity}
            </p>


            <p>
              Price: ${item.price}
            </p>


            <p>
              Subtotal: ${item.price * item.quantity}
            </p>


          </div>


        ))}



        <p>
          Delivery Fee: $3
        </p>



        <h3>
          Total: ${order.total + 3}
        </h3>




        <button onClick={() => copyOrder(order)}>
          Copy Order
        </button>


<button
  onClick={async () => {

    const confirmDelete = window.confirm(
      "Delete this order?"
    );

    if (!confirmDelete) return;


    try {

      await fetch(
  `${API_URL}/api/orders/${order.id}`,
        {
          method: "DELETE",
          headers: {
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`
}
        }
      );


      setOrders(
        orders.filter(
          item => item.id !== order.id
        )
      );


    } catch(error) {

      console.error(
        "DELETE ERROR:",
        error
      );

    }

  }}
>
  Delete Order
</button>


        {order.status === "new" && (

          <button
            onClick={() => updateStatus(order.id, "processing")}
          >
            Accept Order
          </button>

        )}




        {order.status === "processing" && (

          <button
            onClick={() => updateStatus(order.id, "completed")}
          >
            Complete Order
          </button>

        )}



      </div>

    );

  }






  const newOrders = orders.filter(
    order => order.status === "new"
  );


  const processingOrders = orders.filter(
    order => order.status === "processing"
  );


  const completedOrders = orders.filter(
    order => order.status === "completed"
  );







  return (

    <section className="orders-page">


  <button
    className="logout-button"
    onClick={() => {

      localStorage.removeItem("adminLoggedIn");
localStorage.removeItem("adminToken");
      window.location.href = "/admin";

    }}
  >
    Logout
  </button>


  <h2>
    Order Dashboard
  </h2>




      <div className="order-navigation">


        <button
          onClick={() => setActivePanel("new")}
        >
          New Orders ({newOrders.length})
        </button>




        <button
          onClick={() => setActivePanel("processing")}
        >
          Processing ({processingOrders.length})
        </button>




        <button
          onClick={() => setActivePanel("completed")}
        >
          Completed ({completedOrders.length})
        </button>



      </div>






      <div className="orders-content">



        {activePanel === "new" && (

          newOrders.map(order => (

            <OrderCard
              key={order.id}
              order={order}
            />

          ))

        )}






        {activePanel === "processing" && (

          processingOrders.map(order => (

            <OrderCard
              key={order.id}
              order={order}
            />

          ))

        )}







        {activePanel === "completed" && (

          completedOrders.map(order => (

            <OrderCard
              key={order.id}
              order={order}
            />

          ))

        )}



      </div>













      <button
        className="back-top"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          })
        }
      >
        ↑ Back To Top
      </button>



    </section>

  );

}



export default Orders;