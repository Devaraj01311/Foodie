const dotenv = require('dotenv');
dotenv.config();

const app= require('./src/app')
const connectDB =require('./src/connect/db')


connectDB();
const PORT = process.env.PORT || 6001;



app.listen(PORT, () => console.log(`server is stared at PORT: ${PORT}`));