const express = require("express");
const Thing = require('./models/Thing');
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

app.post("/api/stuff", (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
        /*
        equivalent too:
        title: req.body.title,
        description: req.body.description,
        ....
        */
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
});

app.put('/api/stuff/:id', (req, res, next) => { // Modify object

    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié'}))
        .catch(error => res.status(400).json({ error }));
});

app.delete('/api/stuff/:id', (req,res, next) => { // delete object
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé'}))
        .catch(error => res.status(400).json({ error}));
});

app.get("/api/stuff/:id", (req, res, next) => { // get specific ID information
    Thing.findOne({ _id: req.params.id}) // Filter on ID
        .then(things => res.status(200).json(things))
        .catch(error => res.status(404).json({ error }));
});

app.get("/api/stuff", (req, res, next) => {
//   const stuff = [
//     {
//       _id: "1",
//       title: "Des lunettes",
//       description: "Les infos de mon premier objet",
//       imageUrl: "",
//       price: 4000,
//       userId: "qsomhivqios",
//     },
//     {
//       _id: "2",
//       title: "Une clé USB non fonctionnelle",
//       description: "Les infos de mon deuxième objet",
//       imageUrl:
//         "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
//       price: 2900,
//       userId: "qsomihvqios",
//     },
//   ];
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
});

module.exports = app;
