const oracledb = require("oracledb");
const dbConfig = {
  user: "bhinder",
  password: "123",
  connectString: "localhost:1521/XE",
};

exports.getAllItems = async () => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      "SELECT * FROM ITEM_TABLE ORDER BY ITEM_ID ASC",
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

exports.createItem = async (itemData) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    const sql = `INSERT INTO ITEM_TABLE (ITEM_NAME, CATEGORY, SECTION, QUANTITY, LOCATION, CONDITION)
                 VALUES (:item_name, :category, :section, :quantity, :location, :condition)`;

    const binds = {
      item_name: itemData.item_name,
      category: itemData.category,
      section: itemData.section,
      quantity: itemData.quantity,
      location: itemData.location,
      condition: itemData.condition,
    };

    const result = await connection.execute(sql, binds, { autoCommit: true });

    await connection.close();

    return result;
  } catch (error) {
    throw error;
  }
};

exports.readItem = async (item_id) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT ITEM_ID, ITEM_NAME, CATEGORY, SECTION, QUANTITY, LOCATION, CONDITION
       FROM ITEM_TABLE
       WHERE ITEM_ID = :item_id`,
      [item_id]
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
};

exports.updateItem = async (itemData) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    const query = `UPDATE ITEM_TABLE
       SET ITEM_NAME = :item_name, CATEGORY = :category, SECTION = :section, QUANTITY = :quantity, LOCATION = :location, CONDITION = :condition 
       WHERE ITEM_ID = :item_id`;

    const binds = {
      item_id: itemData.item_id,
      item_name: itemData.item_name,
      category: itemData.category,
      section: itemData.section,
      quantity: itemData.quantity,
      location: itemData.location,
      condition: itemData.condition,
    };

    const result = await connection.execute(query, binds, { autoCommit: true });

    await connection.close();

    return result;
  } catch (error) {
    throw error;
  }
};

exports.deleteItem = async (item_id) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    const query = `DELETE FROM ITEM_TABLE WHERE ITEM_ID = :item_id`;

    const result = await connection.execute(
      query,
      { item_id },
      { autoCommit: true }
    );

    await connection.close();

    return result;
  } catch (error) {
    throw error;
  }
};
