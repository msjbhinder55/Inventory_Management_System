const deliveryReturnsModel = require("../models/deliveryReturnsModel");

exports.getDeliveryReturns = async (req, res) => {
  try {
    const deliveryReturns = await deliveryReturnsModel.getAllDeliveryReturns();

    res.render("deliveryReturns", {
      deliveryReturns,
    });
  } catch (err) {
    console.error("Error retrieving requirements:", err);
    res.status(500).send("Error retrieving requirements");
  }
};
