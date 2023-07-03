import express from 'express';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';
import cors from 'cors';
import { authRouter } from './routes/auth.routes.js';
import { productRouter } from './routes/products.routes.js';
import { orderRouter } from './routes/orders.routes.js';
import { customerRouter } from './routes/customers.routes.js';
import { checkoutRouter } from './routes/checkout.route.js';
import { adminRouter } from './routes/admin.routes.js';
import { dbConfig } from './config/config.js';

dotenv.config();

const app = express();

app.use('/checkout',checkoutRouter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());
app.use('/auth', authRouter);
app.use('/products',productRouter);
app.use('/orders',orderRouter)
app.use('/customers',customerRouter);
app.use('/admins',adminRouter);


app.get('/', (req, res) => {
  res.send('hey this is QCS api');
});

app.listen(dbConfig.port|| 5000, () => {
  console.log(`Server is up and running on port `);
});


