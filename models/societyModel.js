const oracledb = require("oracledb");
const dbConfig = {
  user: "bhinder",
  password: "123",
  connectString: "localhost:1521/XE",
};

exports.getAllSociety = async () => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      "SELECT * FROM SOCIETY_TABLE ORDER BY SOCIETY_ID ASC",
      [],
      {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      }
    );

    return result.rows;
  } catch (err) {
    console.error("Error retrieving items from the database:", err);
    throw new Error("Error retrieving items from the database");
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing database connection:", err);
      }
    }
  }
};

exports.createSociety = async (societyData) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    const sql = `INSERT INTO SOCIETY_TABLE (SOCIETY_NAME, CONTACT_NAME, CONTACT_EMAIL, CONTACT_PHONE, DELIVERY_ADDRESS, APPROVED_BY_SUPER_ADMIN)
                 VALUES (:society_name, :contact_name, :contact_email, :contact_phone, :delivery_address, :approved_by_super_admin)`;

    const binds = {
      society_name: societyData.society_name,
      contact_name: societyData.contact_name,
      contact_email: societyData.contact_email,
      contact_phone: societyData.contact_phone,
      delivery_address: societyData.delivery_address,
      approved_by_super_admin: societyData.approved_by_super_admin,
    };

    const result = await connection.execute(sql, binds, { autoCommit: true });

    await connection.close();

    return result;
  } catch (error) {
    throw error;
  }
};
