const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder
} = require("../controllers/orderController");


router.post("/", createOrder);

router.get("/", auth, getOrders);

router.put("/:id/status", auth, updateOrderStatus);

router.delete("/:id", auth, deleteOrder);

module.exports = router;