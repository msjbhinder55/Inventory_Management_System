const oracledb = require("oracledb");
const dbConfig = {
  user: "bhinder",
  password: "123",
  connectString: "localhost:1521/XE",
};

exports.getAllDeliveryReturns = async () => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    /*
    const query = `SELECT D.RECORD_ID, D.SOCIETY_ID, D.ITEM_ID, D.USER_ID, D.DELIVERY_DATE, D.DELIVERY_TIME, D.IS_RETURNED, D.QUANTITY_RETURNED, D.DATE_RETURNED, D.CONDITION, D.RETURNED_BY
                   FROM DELIVERY_RETURNS_TABLE D
                   JOIN SOCIETY S ON D.SOCIETY_ID = S.SOCIETY_ID
                   JOIN ITEM I ON D.ITEM_ID = I.ITEM_ID;`;
                   */

    const query = `SELECT * FROM DELIVERY_RETURNS_TABLE ORDER BY DELIVERY_DATE ASC`;

    const result = await connection.execute(query, [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

    return result.rows;
  } catch (err) {
    console.error(
      "Error retrieving Delivery and Returns from the database:",
      err
    );
    throw new Error("Error retrieving Delivery and Returns from the database");
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
