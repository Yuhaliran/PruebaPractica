require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5050;

const vendedoresRoutes = require('./routes/vendedores');
app.use('/vendedores', vendedoresRoutes);


app.get('/', (req, res) => {
    res.send('API funcionando 🚀');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
