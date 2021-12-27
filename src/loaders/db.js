const Mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await Mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB connected: ${conn.connection.host}`.cyan.bold.underline);
};

module.exports = connectDB;
