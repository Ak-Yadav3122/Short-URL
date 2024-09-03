const express = require("express");
const { connectToMongoDB } = require("./connect");
const path = require('path');
const URL = require("./models/url");


// import Routes
const staticRoute = require('./routes/staticRouter')
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");


const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb connected")
);

//tell express which engine we use 
app.set('view engine', 'ejs');
//tell the  path of views bu using modules path which are prebuild in express
app.set('views',path.resolve("./views"));

//middleWares
app.use(express.json()); //this is used to handle the json data
app.use(express.urlencoded({extended:false})) //this is used to handle the form data

// Register the Routes

app.use("/url", urlRoute);
app.use("/user",userRoute)
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
