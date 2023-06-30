import { dbConfig } from "../config/config.js";
import jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt'
import sql from "mssql";
import dotenv from 'dotenv'
dotenv.config()



export const adminlogin = async (req, res) => {
  try {
    const connection = await sql.connect(dbConfig);
    const { username, email, password} = req.body;
    const query = "SELECT * FROM admin WHERE username = @username AND email = @email";

    const results = await connection
      .request()
      .input("username", sql.VarChar, username)
      .input("email", sql.VarChar, email)
      .query(query);

    if (!results.recordset[0]) {
      return res.json({ message: "Invalid username or email" });
    }

    const hashedPassword = results.recordset[0].password;
    const validPassword = bcrypt.compareSync(password, hashedPassword);

    if (!validPassword) {
      return res.json({ message: "Incorrect password" });
    }

    const payload = results.recordset.map((admin) => {
      const { password, ...rest } = admin;
      return { ...rest };
    });

    const { JWT_SECRET } = process.env;
    const token = jwt.sign(payload[0], JWT_SECRET);

    res.json({ message: "Logged in successfully",email,username, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};


export const getAlladmin = async (req, res) => {
    try {
      const connection = await sql.connect(dbConfig);
      const query = "SELECT * FROM admin";
      const result = await connection.query(query);
  
      const admin= result.recordset;
  
      return res.status(200).json({ admin });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    } finally {
      sql.close();
    }
  };

  export const addadmin= async (req, res) => {
    try {
      const { first_name, last_name, email, username,password } = req.body;
  
      const connection = await sql.connect(dbConfig);
  
      const query1 = "SELECT * FROM admin WHERE username= @username";
      const result = await connection
        .request()
        .input("username", sql.VarChar, username)
        .query(query1);
  
      if (result.recordset.length > 0) {
        return res.json({ message: "there is admin with that username." });
      } else {
        let hashPassword = bcrypt.hashSync(password, 10);
  
        const query = `
          INSERT INTO admin (first_name, last_name,email,username, password)
          VALUES (@first_name, @last_name,  @email,@username, @password)
        `;
  
        await connection
          .request()
          .input("first_name", sql.VarChar, first_name)
          .input("last_name", sql.VarChar, last_name)
     
          .input("email", sql.VarChar, email)     
          .input("username", sql.VarChar,username)
          .input("password", sql.VarChar, hashPassword)
          .query(query);
  
        return res.status(200).json({ message: "admin created successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      sql.close();
    }

  };
 export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await sql.connect(dbConfig);

    const query = `
      DELETE FROM admin
      WHERE id = @id
    `;

    await connection
      .request()
      .input("id", sql.Int, id)
      .query(query);

    return res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, password } = req.body;

    const connection = await sql.connect(dbConfig);

    const query = `
      UPDATE admin
      SET
        first_name = @first_name,
        last_name = @last_name,
        email = @email,
        password = @password
      WHERE id = @id
    `;

    await connection
      .request()
      .input("first_name", sql.VarChar, first_name)
      .input("last_name", sql.VarChar, last_name)
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, password)
      .input("id", sql.Int, id)
      .query(query);

    return res.status(200).json({ message: "Admin updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};


