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

    const result = await connection.execute("SELECT * FROM USER_TABLE", [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

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

exports.getAllItems = async () => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute("SELECT * FROM ITEM_TABLE", [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

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

exports.getTotalUsers = async () => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      "SELECT COUNT(*) AS total_users FROM USER_TABLE",
      [],
      {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      }
    );

    return result.rows[0].TOTAL_USERS;
  } catch (err) {
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

exports.getTotalItems = async () => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      "SELECT COUNT(*) AS total_items FROM ITEM_TABLE",
      [],
      {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      }
    );

    return result.rows[0].TOTAL_ITEMS;
  } catch (err) {
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

exports.getTotalSociety = async () => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      "SELECT COUNT(*) AS total_society FROM SOCIETY_TABLE",
      [],
      {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      }
    );

    return result.rows[0].TOTAL_SOCIETY;
  } catch (err) {
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

exports.getTotalSocietyRequirement = async () => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      "SELECT COUNT(*) AS total_society_requirement FROM SOCIETY_REQ_TABLE",
      [],
      {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      }
    );

    return result.rows[0].TOTAL_SOCIETY_REQUIREMENT;
  } catch (err) {
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
