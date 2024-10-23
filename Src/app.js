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

const corsOptions = {
   origin: 'http://localhost:5173', 
   credentials: true, 
   optionsSuccessStatus: 200, 
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(morgan('combined'));

// app.use('/user', userRoutes);
// app.use('/client', clientRoutes);
app.use('/admin', adminRoutes);

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

