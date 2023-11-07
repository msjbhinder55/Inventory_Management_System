const itemModel = require("../models/itemModel");

exports.getItem = async (req, res) => {
  try {
    const items = await itemModel.getAllItems();

    res.render("item", {
      items: items,
    });
  } catch (err) {
    console.error("Error retrieving items:", err);
    res.status(500).send("Error retrieving items");
  }
};

exports.createItem = async (req, res) => {
  try {
    const { item_name, category, section, quantity, location, condition } =
      req.body;
    console.log("Received form data:", req.body);

    const itemData = {
      item_name,
      category,
      section,
      quantity,
      location,
      condition,
    };

    await itemModel.createItem(itemData);

    console.log("Item added successfully");

    const items = await itemModel.getAllItems();

    res.render("item", {
      items: items,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};

exports.readItem = async (req, res) => {
  const item_id = req.params.item_id;

  try {
    const result = await itemModel.readItem(item_id);
    res.render("updateItem", { item: result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateItem = async (req, res) => {
  try {
    const {
      item_id,
      item_name,
      category,
      section,
      quantity,
      location,
      condition,
    } = req.body;

    const itemData = {
      item_id: item_id,
      item_name: item_name,
      category: category,
      section: section,
      quantity: quantity,
      location: location,
      condition: condition,
    };

    await itemModel.updateItem(itemData);

    console.log("Item updated successfully");

    const items = await itemModel.getAllItems();

    res.render("item", {
      items: items,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item_id = req.body.item_id;

    if (!item_id) {
      return res.status(400).json({ error: "Item ID is required." });
    }

    const rowsAffected = await itemModel.deleteItem(item_id);

    if (rowsAffected === 1) {
      res.json({ message: "Item deleted successfully." });
    } else {
      res.status(404).json({ error: "Item not found." });
    }
    res.render("item");
  } catch (err) {
    console.error("Error deleting item:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the item." });
  }
};
