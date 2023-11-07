const societyModel = require("../models/societyModel");

exports.getSociety = async (req, res) => {
  try {
    const societies = await societyModel.getAllSociety();

    res.render("society", {
      societies: societies,
    });
  } catch (err) {
    console.error("Error retrieving society:", err);
    res.status(500).send("Error retrieving society");
  }
};

exports.createSociety = async (req, res) => {
  try {
    const {
      society_name,
      contact_name,
      contact_email,
      contact_phone,
      delivery_address,
      approved_by_super_admin,
    } = req.body;

    console.log("Received form data:", req.body);

    const societyData = {
      society_name,
      contact_name,
      contact_email,
      contact_phone,
      delivery_address,
      approved_by_super_admin,
    };

    await societyModel.createSociety(societyData);

    console.log("Society added successfully");

    const societies = await societyModel.getAllSociety();

    res.render("society", {
      societies: societies,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};
