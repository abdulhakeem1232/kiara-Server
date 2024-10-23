const {Pool} =require('pg')

const pool=new Pool({
  user: process.env.PG_USER,          
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
})

const connectDB=async()=>{
    try{
       await pool.connect();
       console.log('Database Connected Successfully');
       
    }catch(error){
       console.error('Error connecting to PostgreSQL:', error);
       throw error;
    }
}

module.exports={
    pool,
    connectDB
}
