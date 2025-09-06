const express = require("express");
const {
  getRestaurants,
  addRestaurant,
  toggleMenuItem,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/restaurantController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getRestaurants);
router.post("/", verifyToken, addRestaurant);

// Menu CRUD
router.post("/:restaurantId/menu", verifyToken, addMenuItem);
router.put("/:restaurantId/menu/:menuIndex", verifyToken, updateMenuItem);
router.delete("/:restaurantId/menu/:menuIndex", verifyToken, deleteMenuItem);
router.put("/menu/toggle/:restaurantId/:menuIndex", verifyToken, toggleMenuItem);

module.exports = router;
