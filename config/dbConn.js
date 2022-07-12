import mongoose from 'mongoose';

const connectDB = async () => {
  await mongoose.connect(process.env.DATABASE_URI, {
    useUnifiedTopology: true,
  });
  try {
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
