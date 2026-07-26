const pool = require("../db");



const createOrder = async (req, res) => {

  const {
    customer,
    items,
    total
  } = req.body;


  try {


    const orderResult = await pool.query(

      `
      INSERT INTO orders
      (
        customer_name,
        phone,
        city,
        address,
        total,
        status
      )

      VALUES
      ($1, $2, $3, $4, $5, $6)

      RETURNING id, created_at
      `,

      [
        customer.name,
        customer.phone,
        customer.city,
        customer.address,
        total,
        "new"
      ]

    );



    const orderId = orderResult.rows[0].id;



    for (const item of items) {


      await pool.query(

        `
        INSERT INTO order_items
        (
          order_id,
          product_name,
          price,
          quantity
        )

        VALUES
        ($1, $2, $3, $4)
        `,

        [
          orderId,
          item.name,
          item.price,
          item.quantity
        ]

      );


    }



    res.status(201).json({

      message: "Order created",

      orderId

    });



  } catch (error) {


    console.error("CREATE ORDER ERROR:", error);


    res.status(500).json({

      message: "Could not create order"

    });


  }


};






const getOrders = async (req, res) => {


  try {


    const ordersResult = await pool.query(

      `
      SELECT *
      FROM orders
      ORDER BY created_at DESC
      `

    );



    const orders = [];



    for (const order of ordersResult.rows) {


      const itemsResult = await pool.query(

        `
        SELECT *
        FROM order_items
        WHERE order_id = $1
        `,

        [
          order.id
        ]

      );



      orders.push({

        id: order.id,


        customer: {

          name: order.customer_name,

          phone: order.phone,

          city: order.city,

          address: order.address

        },


        items: itemsResult.rows.map(item => ({

          name: item.product_name,

          price: Number(item.price),

          quantity: item.quantity

        })),


        total: Number(order.total),

        status: order.status,

        date: order.created_at


      });


    }



    res.json(orders);



  } catch (error) {


    console.error("GET ORDERS ERROR:", error);


    res.status(500).json({

      message: "Could not fetch orders"

    });


  }


};


const updateOrderStatus = async (req, res) => {

  const { id } = req.params;
  const { status } = req.body;

  try {

    const result = await pool.query(
      `
      UPDATE orders
      SET status = $1
      WHERE id = $2
      RETURNING *
      `,
      [
        status,
        id
      ]
    );

    res.json(result.rows[0]);

  } catch(error) {

    console.error("UPDATE STATUS ERROR:", error);

    res.status(500).json({
      message: "Could not update status"
    });

  }

};



const deleteOrder = async (req, res) => {

  const { id } = req.params;

  try {

    await pool.query(
      `
      DELETE FROM order_items
      WHERE order_id = $1
      `,
      [id]
    );


    await pool.query(
      `
      DELETE FROM orders
      WHERE id = $1
      `,
      [id]
    );


    res.json({
      message: "Order deleted"
    });


  } catch(error) {

    console.error("DELETE ORDER ERROR:", error);

    res.status(500).json({
      message: "Could not delete order"
    });

  }

};



module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder
};