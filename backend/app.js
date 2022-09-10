const express = require("express");
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");

const path = require('path');
/*
   _____         __                                __           __             __
  / ___/  ___   / /_  __  __    ____          ____/ /  ____ _  / /_  ____ _   / /_   ____ _   _____  ___
  \__ \  / _ \ / __/ / / / /   / __ \        / __  /  / __ `/ / __/ / __ `/  / __ \ / __ `/  / ___/ / _ \
 ___/ / /  __// /_  / /_/ /   / /_/ /       / /_/ /  / /_/ / / /_  / /_/ /  / /_/ // /_/ /  (__  ) /  __/
/____/  \___/ \__/  \__,_/   / .___/        \__,_/   \__,_/  \__/  \__,_/  /_.___/ \__,_/  /____/  \___/
                            /_/
*/
const mongoose = require('mongoose');

mongoose
  .connect(
    "mongodb+srv://RomB29:Pirouette29asse@cluster0.rxiufhl.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

/*
    ___     ____     ____
   /   |   / __ \   / __ \
  / /| |  / /_/ /  / /_/ /
 / ___ | / ____/  / ____/
/_/  |_|/_/      /_/

*/

const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
// //   const corsWhitelist = ["http://localhost:3000", "http://localhost:4200", '*'];
// //   if (corsWhitelist.includes(req.headers.origin)) {
// //     res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
// //     res.setHeader(
// //       "Access-Control-Allow-Headers",
// //       "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
// //     );
// //     res.setHeader(
// //       "Access-Control-Allow-Methods",
// //       "GET, POST, PUT, DELETE, PATCH, OPTIONS"
// //     );
// //     next();
// //   }
// });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, '..', 'images')));

module.exports = app;
