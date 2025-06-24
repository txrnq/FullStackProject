
// server/app.js
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.js'; // import route ที่ใช้ pool
import paymentRoutes from './routes/payments.js';
import tenantsRoutes from './routes/tenant.js';
import repairRoutes from './routes/repairs.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// app.use('/api/users', userRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/payments', paymentRoutes); 
app.use('/api/payments', paymentRoutes);
// app.use('/api/tanents ', tenantRoutes); );
app.use('/api/tanents', tenantsRoutes);
// app.use('/api/repairs', repairRoutes);
app.use('/api/repairs', repairRoutes);


app.listen(port, (err) => {
  console.log(`Server running on port ${port}`, err);
});
