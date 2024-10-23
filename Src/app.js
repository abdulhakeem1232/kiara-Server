require('dotenv').config();
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan');
const{connectDB} = require('./Config/dbConncetion')

const adminRoutes = require('./App/Routes/adminRoutes') 

const createUsersTable = require('./Migrations/UserTable')
const createClientsTable = require('./Migrations/ClientTable')
const createAdminsTable = require('./Migrations/AdminTable')

const app=express()

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('combined'));

// app.use('/api/users', userRoutes);
// app.use('/api/clients', clientRoutes);
app.use('/api/admins', adminRoutes);

const startServer=async()=>{
    try{
       await connectDB();

       await createUsersTable();
       await createClientsTable();
       await createAdminsTable();

       const port=process.env.SERVER_PORT||3001
       app.listen(port,()=>{
          console.log(`Server Running ${port}`);
       })
    }catch (error) {
       console.error('Failed to start the server:', error);
  }  
}

module.exports = {
    app,
    startServer,
  };

