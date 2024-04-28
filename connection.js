const uri = process.env.DBURL||'mongodb+srv://22cs3003:rFhm1QhvCuy47eoR@chukchuk.mfx9om4.mongodb.net/';
// dotenv.config({path:'C:\Users\agast\OneDrive\Desktop\infernocoders\config.env'});



// import { MongoClient, ServerApiVersion } from "mongodb";
// import dotenv from 'dotenv';

// const client = new MongoClient(uri, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });

// (async () => {
//   try {
//     await client.connect();
//     console.log('Connected to the database');
//     const db = client.db("Inferno_Coders");
//     console.log('Connected to the Inferno_Coders database');
//   } catch (err) {
//     console.error('Error connecting to the database:', err);
//   } finally {
//     await client.close();
//   }
// })();


// let db = await client.db("Inferno_Coders");

 
// export default db;

import { MongoClient } from "mongodb";
// import dotenv from 'dotenv';

// const uri = process.env.MONGODB_URI; // Make sure to define MONGODB_URI in your config.env file

// dotenv.config({ path: 'C:\\Users\\agast\\OneDrive\\Desktop\\infernocoders\\config.env' });

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected to the database');
    const db = client.db("Chuk_Chuk");
    console.log('Connected to the Inferno_Coders database');
    return db;
  } catch (err) {
    console.error('Error connecting to the database:', err);
    throw err; // Rethrow the error to handle it elsewhere if needed
  }
};

export default connectToDatabase;
