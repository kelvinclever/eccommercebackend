import { dbConfig } from "../config/config.js";
import dotenv from "dotenv";
import sql from "mssql";
import bcrypt from 'bcrypt'

dotenv.config();

const isCustomerExist = async (customer_id) => {
  const connection = await sql.connect(dbConfig);
  const query = "SELECT * FROM Customers WHERE customer_id= @customer_id";
  const result = await connection
    .request()
    .input("customer_id", sql.VarChar, customer_id)
    .query(query);

  sql.close();

  return result.recordset.length > 0;
};

export const addCustomer = async (req, res) => {
    try {
    
      const { email } = req.body;
  
        const connection = await sql.connect(dbConfig);
  
      // Check if the user already exists
      const query1 = "SELECT * FROM customers WHERE email = @email";
      const result = await connection
        .request()
        .input("email", sql.VarChar, email)
        .query(query1);
  
      if (result.recordset.length > 0) {
        return res.json({ message: "User already exists. Please log in." });
      } else {
      
        const { first_name, last_name, phone_number ,email,password} = req.body;
        let hashPassword = bcrypt.hashSync(password, 10);
      const connection = await sql.connect(dbConfig);
      const query = `
        INSERT INTO Customers (first_name, last_name, phone_number, email,password)
        VALUES (@first_name, @last_name, @phone_number, @email,@password)
      `;
  
      await connection
        .request()
        .input("first_name", sql.VarChar, first_name)
        .input("last_name", sql.VarChar, last_name)
        .input("phone_number", sql.VarChar, phone_number)
        .input("email", sql.VarChar,email)
        .input("password", sql.VarChar, hashPassword)
        .query(query);
  
      return res.status(200).json({ message: "Customer created successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      sql.close();
    }
  };

export const getCustomerById = async (req, res) => {
  try {
    const { customer_id } = req.params;

    if (!(await isCustomerExist(customer_id))) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const connection = await sql.connect(dbConfig);
    const query = "SELECT * FROM Customers WHERE customer_id = @customer_id";
    const result = await connection
      .request()
      .input("customer_id", sql.Int, customer_id)
      .query(query);

    const customer = result.recordset[0];

    return res.status(200).json({ customer });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { customer_id } = req.params;

    if (!(await isCustomerExist(customer_id))) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const { first_name, last_name, phone_number, email } = req.body;

    const connection = await sql.connect(dbConfig);
    const query = `
      UPDATE Customers
      SET first_name = @first_name, last_name = @last_name, phone_number = @phone_number,
      email = @email
      WHERE customer_id = @customer_id
    `;

    await connection
      .request()
      .input("first_name", sql.VarChar, first_name)
      .input("last_name", sql.VarChar, last_name)
      .input("phone_number", sql.VarChar, phone_number)
      .input("email", sql.VarChar, email)
      .query(query);

    return res.status(200).json({ message: "Customer updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { customer_id } = req.params;

    if (!(await isCustomerExist(customer_id))) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const connection = await sql.connect(dbConfig);
    const query = "DELETE FROM Customers WHERE customer_id = @customer_id";

    await connection
      .request()
      .input("customer_id", sql.Int, customer_id)
      .query(query);

    return res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};
