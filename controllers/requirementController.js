const requirementModel = require("../models/requirementModel");

exports.getRequirement = async (req, res) => {
  try {
    const requirements = await requirementModel.getAllRequirement();

    res.render("societyRequirement", {
      requirements,
    });
  } catch (err) {
    console.error("Error retrieving requirements:", err);
    res.status(500).send("Error retrieving requirements");
  }
};

exports.createRequirement = async (req, res) => {
  try {
    const { quantity, delivery_date, delivery_time, status } = req.body;
    console.log("Received form data:", req.body);

    const requirementData = {
      quantity,
      delivery_date,
      delivery_time,
      status,
    };

    await requirementModel.createRequirement(requirementData);

    console.log("Requirement added successfully");

    const requirements = await requirementModel.getAllRequirement();

    res.render("societyRequirement", {
      requirements,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};
