const userModel = require("../models/userModel");

exports.getUser = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();

    console.log("Retrieved users successfully");

    res.render("user", {
      users: users,
    });
  } catch (err) {
    console.error("Error retrieving users:", err);
    res.status(500).send("Error retrieving users");
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, user_Type } = req.body;
    console.log("Received form data:", req.body);

    const userData = {
      username,
      email,
      password,
      user_Type,
    };

    await userModel.createUser(userData);

    console.log("User added successfully");

    const users = await userModel.getAllUsers();

    res.render("user", {
      users: users,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};

exports.readUser = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const result = await userModel.readUser(user_id);
    console.log("Retrieved user successfully");

    res.render("updateUser", { user: result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { user_id, username, email, password, user_Type } = req.body;

    const userData = {
      user_id: user_id,
      username: username,
      email: email,
      password: password,
      user_Type: user_Type,
    };

    await userModel.updateUser(userData);

    console.log("User updated successfully");

    const users = await userModel.getAllUsers();

    res.render("user", {
      users: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user_id = req.body.user_id;

    if (!user_id) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const rowsAffected = await userModel.deleteUser(user_id);

    if (rowsAffected === 1) {
      console.log("User deleted successfully");
      res.json({ message: "User deleted successfully." });
    } else {
      res.status(404).json({ error: "User not found." });
    }
    res.render("user");
  } catch (err) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user." });
  }
};
