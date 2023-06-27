import { dbConfig } from "../config/config.js";
import dotenv from 'dotenv';
import sql from 'mssql';

dotenv.config();

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, quantity_available, category_name, brand, image_path } = req.body;

    const connection = await sql.connect(dbConfig);
    const query = `
      INSERT INTO Products (name, description, price, quantity_available, category_name, brand, image_path)
      VALUES (@name, @description, @price, @quantity_available, @category_name, @brand, @image_path)
    `;

    await connection
      .request()
      .input("name", sql.VarChar, name)
      .input("description", sql.VarChar, description)
      .input("price", sql.Decimal, price)
      .input("quantity_available", sql.Int, quantity_available)
      .input("category_name", sql.VarChar, category_name)
      .input("brand", sql.VarChar, brand)
      .input("image_path", sql.VarChar, image_path)
      .query(query);

    return res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const connection = await sql.connect(dbConfig);
    const query = "SELECT * FROM Products";
    const result = await connection.request().query(query);

    return res.status(200).json({ products: result.recordset });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};

export const getProductById = async (req, res) => {
  try {
    const { product_id } = req.params;

    const connection = await sql.connect(dbConfig);
    const query = "SELECT * FROM Products WHERE product_id = @product_id";
    const result = await connection
      .request()
      .input("product_id", sql.Int, product_id)
      .query(query);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product: result.recordset[0] });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const { name, description, price, quantity_available, category_name, brand, image_path } = req.body;

    const connection = await sql.connect(dbConfig);
    const query = `
      UPDATE Products SET
      name = @name,
      description = @description,
      price = @price,
      quantity_available = @quantity_available,
      category_name = @category_name,
      brand = @brand,
      image_path = @image_path
      WHERE product_id = @product_id
    `;

    await connection
      .request()
      .input("name", sql.VarChar, name)
      .input("description", sql.VarChar, description)
      .input("price", sql.Decimal, price)
      .input("quantity_available", sql.Int, quantity_available)
      .input("category_name", sql.VarChar, category_name)
      .input("brand", sql.VarChar, brand)
      .input("image_path", sql.VarChar, image_path)
      .input("product_id", sql.Int, product_id)
      .query(query);

    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.params;

    const connection = await sql.connect(dbConfig);
    const query = "DELETE FROM Products WHERE product_id = @product_id";

    await connection
      .request()
      .input("product_id", sql.Int, product_id)
      .query(query);

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};
