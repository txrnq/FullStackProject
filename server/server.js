const express = require('express');
const cors = require('cors');

const paymentRoutes = require('./routes/payments');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/payments', paymentRoutes);


app.listen(5000, () => console.log('Server running on port 5000'));
