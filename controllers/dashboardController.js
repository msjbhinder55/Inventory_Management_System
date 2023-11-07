const dashboardModel = require("../models/dashboardModel");

exports.getDashboardData = async (req, res) => {
  try {
    const users = await dashboardModel.getAllUsers();
    const items = await dashboardModel.getAllItems();
    const totalUsers = await dashboardModel.getTotalUsers();
    const totalItems = await dashboardModel.getTotalItems();
    const totalSociety = await dashboardModel.getTotalSociety();
    const totalSocietyRequirement =
      await dashboardModel.getTotalSocietyRequirement();

    console.log("Retrieved users and items successfully");

    res.render("dashboard", {
      users: users,
      items: items,
      totalUsers: totalUsers,
      totalItems: totalItems,
      totalSociety: totalSociety,
      totalSocietyRequirement: totalSocietyRequirement,
    });
  } catch (err) {
    console.error("Error retrieving data:", err);
    res.status(500).send("Error retrieving data");
  }
};
