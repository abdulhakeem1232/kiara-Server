require('dotenv').config();
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan');
const{connectDB} = require('./Config/dbConncetion')
const http = require('http');
const { initializeSocket } = require('./Config/socket');

const adminRoutes = require('./App/Routes/adminRoutes') 
const clientRoutes = require('./App/Routes/clientRouter')
const userRoutes = require('./App/Routes/userRoute')


const createUsersTable = require('./Migrations/UserTable')
const createClientsTable = require('./Migrations/ClientTable')
const createAdminsTable = require('./Migrations/AdminTable')
const createOperation_logsTable = require('./Migrations/Operations_logs')

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

app.use('/', userRoutes);
app.use('/client', clientRoutes);
app.use('/admin', adminRoutes);

const startServer=async()=>{
    try{
       await connectDB();

       await createUsersTable();
       await createClientsTable();
       await createAdminsTable();
       await createOperation_logsTable();

       const port=process.env.SERVER_PORT||3001
       
       const server = http.createServer(app); 
    
    initializeSocket(server);

    server.listen(port, () => {
      console.log(`Server Running on ${port}`);
    });
    }catch (error) {
       console.error('Failed to start the server:', error);
  }  
}

module.exports = {
    app,
    startServer,
  };

