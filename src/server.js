import express,{json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { authRouter } from './routes/auth.routes.js';
import { productRouter } from './routes/products.routes.js';
import { orderRouter } from './routes/orders.routes.js';
import { customerRouter } from './routes/customers.routes.js';
import { checkoutRouter } from './routes/checkout.route.js';
import { adminRouter } from './routes/admin.routes.js';

dotenv.config();

const app = express();
app.use(express.static('public'));
app.use('/checkout',checkoutRouter);
app.use(json())
app.use(cors({ origin: 'http://localhost:5173' }));
app.use('/auth', authRouter);
app.use('/products',productRouter);
app.use('/orders',orderRouter)
app.use('/customers',customerRouter);
app.use('/admins',adminRouter);
const { PORT } = process.env;

app.get('/', (req, res) => {
  res.send('hey');
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});


