const oracledb = require("oracledb");

const dbConfig = {
  user: "bhinder",
  password: "123",
  connectString: "localhost:1521/XE",
};

exports.findUserByEmailAndPassword = async (email, password) => {
  let connection;
  try {
    const connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT USER_ID, EMAIL, PASSWORD FROM USER_TABLE WHERE EMAIL = :email AND PASSWORD = :password`,
      { email, password }
    );

    const rows = result.rows;
    if (rows.length > 0) {
      const [user_id, email, password] = rows[0];
      return { user_id, email, password };
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};
