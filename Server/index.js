import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import routerUser from "./routes/UserRoute.js";
import routerProduct from "./routes/ProductRoute.js";
import routerAuth from "./routes/AuthRoute.js";
import routerBlog from "./routes/BlogRoute.js";
import routerContact from "./routes/ContactRoute.js";
import routerDevis from "./routes/DevisRoute.js";
import session from "express-session";
import db from "./config/Database.js";
import Users from "./models/UserModel.js";
import Products from "./models/ProductModel.js";
import Blogs from "./models/BlogModel.js";
import Devis from "./models/DevisModel.js";
import Contact from "./models/ContactModel.js";
import SequelizeStore from "connect-session-sequelize";
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(cors({ credentials: true, origin: "http://localhost:4000" }));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(routerUser);
app.use(routerProduct);
app.use(routerAuth);
app.use(routerBlog);
app.use(routerContact);
app.use(routerDevis);
app.use("/uploads", express.static("uploads"));

store.sync();

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
