import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user ";
import cors from "cors";
import cookieParser from "cookie-parser";
import schema from "./schema/schema";
import resolvers from "./schema/resolvers";
import { graphqlHTTP } from "express-graphql";
import { authenticate } from "./middlewares/auth"

// CONSTANTS
const app = express();
const PORT = process.env.PORT;
const PASSWORD = process.env.MONGO_PASSWORD;
const USERNAME = process.env.MONGO_USERNAME;
const DATABASE = "budget_tracker_db";
const origin = process.env.ORIGIN;

// Middlewares
app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  cors({
    origin,
    credentials: true,
  }),
  cookieParser()
);

mongoose.connect(
  `mongodb+srv://${USERNAME}:${PASSWORD}@wdc028-course-booking.aiezb.mongodb.net/${DATABASE}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
mongoose.connection.once("open", () => {
  console.log(`Now connected to MongoDB Atlas!`);
});

/* ROUTES */
app.get("/", (req, res) => {
  res.send("Server is online");
});

// app.use("/api/users", userRoutes);

// app.use(loggingMiddleware)
app.use(
  "/graphql",
  // authenticate,
  graphqlHTTP({ schema, rootValue: resolvers, graphiql: process.env.MODE === "DEVELOPMENT" })
);

app.listen(PORT, () => {
  console.log(`Sever is listening on port ${PORT}...`);
});
