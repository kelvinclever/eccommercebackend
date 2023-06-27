import { dbConfig } from "../config/config.js";
import dotenv from 'dotenv';
import sql from 'mssql';

dotenv.config();

export const createOrder = async (req, res) => {
  try {
    const { customer_id, order_date, total_amount, payment_id } = req.body;
    const connection = await sql.connect(dbConfig);

    const query = `
      INSERT INTO Orders (customer_id, order_date, total_amount, payment_id)
      VALUES (@customer_id, @order_date, @total_amount, @payment_id)
    `;

    await connection
      .request()
      .input("customer_id", sql.Int, customer_id)
      .input("order_date", sql.Date, order_date)
      .input("total_amount", sql.Decimal, total_amount)
      .input("payment_id", sql.Int, payment_id)
      .query(query);

    return res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const connection = await sql.connect(dbConfig);
    const query = "SELECT * FROM Orders";
    const result = await connection.request().query(query);

    return res.status(200).json({ orders: result.recordset });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { order_id } = req.params;
    const connection = await sql.connect(dbConfig);
    const query = "SELECT * FROM Orders WHERE order_id = @order_id";
    const result = await connection
      .request()
      .input("order_id", sql.Int, order_id)
      .query(query);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ order: result.recordset[0] });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const { customer_id, order_date, total_amount, payment_id } = req.body;
    const connection = await sql.connect(dbConfig);

    const query = `
      UPDATE Orders
      SET customer_id = @customer_id, order_date = @order_date,
          total_amount = @total_amount, payment_id = @payment_id
      WHERE order_id = @order_id
    `;

    await connection
      .request()
      .input("customer_id", sql.Int, customer_id)
      .input("order_date", sql.Date, order_date)
      .input("total_amount", sql.Decimal, total_amount)
      .input("payment_id", sql.Int, payment_id)
      .input("order_id", sql.Int, order_id)
      .query(query);

    return res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const connection = await sql.connect(dbConfig);
    const query = "DELETE FROM Orders WHERE order_id = @order_id";

    await connection
      .request()
      .input("order_id", sql.Int, order_id)
      .query(query);

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};
