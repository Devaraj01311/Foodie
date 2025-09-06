const Restaurant = require("../model/Restaurant");

// Get all restaurants
exports.getRestaurants = async (req, res) => {
  try {
    let query = {};
    if (req.user && req.user.role === "restaurant") {
      query.owner = req.user.id;
    }
    const restaurants = await Restaurant.find(query);
    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: error.message });
  }
};

// Add restaurant
exports.addRestaurant = async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "restaurant") {
    return res.status(403).json({ message: "Not authorized to add restaurants" });
  }
  try {
    const restaurant = await Restaurant.create({
      ...req.body,
      owner: req.user.id,
    });
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Toggle availability of menu item
exports.toggleMenuItem = async (req, res) => {
  try {
    const { restaurantId, menuIndex } = req.params;
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    if (restaurant.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    restaurant.menu[menuIndex].available = !restaurant.menu[menuIndex].available;
    await restaurant.save();

    res.status(200).json(restaurant.menu[menuIndex]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new menu item
exports.addMenuItem = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    if (restaurant.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    restaurant.menu.push(req.body); 
    await restaurant.save();

    res.status(201).json(restaurant.menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const { restaurantId, menuIndex } = req.params;
    const updateData = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    if (restaurant.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (!restaurant.menu[menuIndex]) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    restaurant.menu[menuIndex] = { ...restaurant.menu[menuIndex]._doc, ...updateData };
    await restaurant.save();

    res.status(200).json(restaurant.menu[menuIndex]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const { restaurantId, menuIndex } = req.params;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    if (restaurant.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (!restaurant.menu[menuIndex]) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    restaurant.menu.splice(menuIndex, 1);
    await restaurant.save();

    res.status(200).json({ message: "Menu item deleted", menu: restaurant.menu });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
