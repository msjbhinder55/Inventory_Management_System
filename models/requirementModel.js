const oracledb = require("oracledb");
const dbConfig = {
  user: "bhinder",
  password: "123",
  connectString: "localhost:1521/XE",
};

exports.getAllRequirement = async () => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    /*
    const query = `SELECT SR.REQ_ID, SR.SOCIETY_ID, S.SOCIETY_NAME, SR.ITEM_ID, I.ITEM_NAME, SR.QUANTITY, SR.DELIVERY_DATE, SR.DELIVERY_TIME, SR.STATUS
                   FROM SOCIETY_REQ_TABLE SR
                   JOIN SOCIETY_TABLE S ON SR.SOCIETY_ID = S.SOCIETY_ID
                   JOIN ITEM_TABLE I ON SR.ITEM_ID = I.ITEM_ID`;

                   */

    const query = `SELECT * FROM SOCIETY_REQ_TABLE ORDER BY REQ_ID ASC`;

    const result = await connection.execute(query, [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

    return result.rows;
  } catch (err) {
    console.error("Error retrieving requirements from the database:", err);
    throw new Error("Error retrieving requirements from the database");
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

exports.createRequirement = async (requirementData) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    const sql = `INSERT INTO SOCIETY_REQ_TABLE (QUANTITY, DELIVERY_DATE, DELIVERY_TIME, STATUS)
                 VALUES (:quantity, TO_DATE(:delivery_date, 'YYYY-MM-DD'), :delivery_time, :status)`;

    const binds = {
      quantity: requirementData.quantity,
      delivery_date: requirementData.delivery_date,
      delivery_time: requirementData.delivery_time,
      status: requirementData.status,
    };

    const result = await connection.execute(sql, binds, { autoCommit: true });

    await connection.close();

    return result;
  } catch (error) {
    throw error;
  }
};
