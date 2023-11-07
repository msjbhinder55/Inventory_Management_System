const oracledb = require("oracledb");
const dbConfig = {
  user: "bhinder",
  password: "123",
  connectString: "localhost:1521/XE",
};

exports.getAllUsers = async () => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      "SELECT * FROM USER_TABLE ORDER BY USER_ID ASC",
      [],
      {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      }
    );

    return result.rows;
  } catch (err) {
    console.error("Error retrieving users from the database:", err);
    throw new Error("Error retrieving users from the database");
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

exports.createUser = async (userData) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    const sql = `INSERT INTO USER_TABLE (USERNAME, EMAIL, PASSWORD, USER_TYPE)
                 VALUES (:username, :email, :password, :user_Type)`;

    const binds = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      user_Type: userData.user_Type,
    };

    const result = await connection.execute(sql, binds, { autoCommit: true });

    await connection.close();

    return result;
  } catch (error) {
    throw error;
  }
};

exports.readUser = async (user_id) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT USER_ID, USERNAME, EMAIL, PASSWORD, USER_TYPE
       FROM USER_TABLE
       WHERE USER_ID = :user_id`,
      [user_id]
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
};

exports.updateUser = async (userData) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    const query = `UPDATE USER_TABLE
       SET USERNAME = :username, EMAIL = :email, PASSWORD = :password, USER_TYPE = :user_Type
       WHERE USER_ID = :user_id`;

    const binds = {
      user_id: userData.user_id,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      user_Type: userData.user_Type,
    };

    const result = await connection.execute(query, binds, { autoCommit: true });

    await connection.close();

    return result;
  } catch (error) {
    throw error;
  }
};

exports.deleteUser = async (user_id) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    const query = `DELETE FROM USER_TABLE WHERE USER_ID = :user_id`;

    const result = await connection.execute(
      query,
      { user_id },
      { autoCommit: true }
    );

    await connection.close();

    return result;
  } catch (error) {
    throw error;
  }
};
