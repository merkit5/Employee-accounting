const express =require('express');
const cors = require('cors');
const path = require('path');
const employeeRoutes = require('./router/employee');
const sequelize = require('./config/db');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/api/employee', employeeRoutes);

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    console.log(' Sync сompleted ');
    app.listen(PORT, () => {
        console.log(` http://localhost:${PORT} `);
    });
})
.catch(err => console.log(' Sync error: ', err));