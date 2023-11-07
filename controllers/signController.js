const signModel = require("../models/signModel");
const dashboardModel = require("../models/dashboardModel");
const nodemailer = require("nodemailer");

exports.signIn = async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;

  try {
    const data = await signModel.findUserByEmailAndPassword(email, password);

    if (data) {
      console.log("Match found.");

      // Send a sign-in success email
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "marty49@ethereal.email",
          pass: "Nk5Qpe5asjpyem3kpC",
        },
      });

      const mailOptions = {
        from: "msjbhinder@gmail.com",
        to: email,
        subject: "Sign In Successful",
        text: "You have successfully signed in.",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error occurred while sending email:", error);
        } else {
          console.log("Sign-in success email sent:", info.response);
        }
      });

      const users = await dashboardModel.getAllUsers();
      const items = await dashboardModel.getAllItems();
      const totalUsers = await dashboardModel.getTotalUsers();
      const totalItems = await dashboardModel.getTotalItems();
      const totalSociety = await dashboardModel.getTotalSociety();
      const totalSocietyRequirement =
        await dashboardModel.getTotalSocietyRequirement();

      res.render("dashboard", {
        users: users,
        items: items,
        totalUsers: totalUsers,
        totalItems: totalItems,
        totalSociety: totalSociety,
        totalSocietyRequirement: totalSocietyRequirement,
      });
    } else {
      console.log("No match found.");
      res.send("Invalid email or password");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
