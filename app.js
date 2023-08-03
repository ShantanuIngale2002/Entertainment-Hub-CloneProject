const express = require("express");
const bodyParser = require("body-parser");

const app = express()

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use("/public",express.static("public"));


const mongoose = require("mongoose");

const connectDB = async () => {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/SamtaDB", { useNewUrlParser: true });
    console.log(`successfully connected: ${conn.connection.host} at DB: ${conn.connection.name}`);
};
connectDB().catch((err) => {
    console.log(`Error : ${err}`);
});


//schema
const ItemSchema = {
    name:String,
    email: String,
    password: String,
};
const Item = mongoose.model("credential", ItemSchema);



app.get("/", function (req, res) {
    res.render("project",{
        subName:"Subscribe",
        userName:"Login",
    });
});

app.get("/login", function (req, res) {
    res.render("login");
});

app.get("/register", function (req, res) {
    res.render("register");
})




app.post("/login", function (req, res) {
    let currentName="default";
    let currentEmail = req.body.email;
    let currentPassword = req.body.password;

    let present = false;
    Item.find({})
        .then(foundItem => {
            foundItem.forEach(function (obj) {
                if (obj.email == currentEmail) {
                    if (obj.password == currentPassword) {
                        currentName=obj.Name;
                        present = true;
                    }
                    else {
                        res.render("tologin", {
                            resultIs: "Password is Wrong",
                            resultMsg: "Try Again !",
                        });
                    }
                }
            });
            if (!present) {
                res.render("toregister", {
                    resultIs: "Email Not Registered",
                    resultMsg: "Register Yourself Here !",
                });
            }
            else {
                res.render("project",{
                    subName:"Welcome",
                    userName:currentName,
                });
            }
        })
        .catch(err => console.log(err));
})


app.post("/register", function (req, res) {
    let currentEmail = req.body.email;
    let currentPassword = req.body.password;
    let currentItem = new Item({
        email: currentEmail,
        password: currentPassword,
    });
    let present = false;
    Item.find({})
        .then(foundItem => {
            foundItem.forEach(function (obj) {
                if (obj.email == currentEmail) {
                    present = true;
                }
            });
            if (!present) {
                Item.insertMany(currentItem);
                res.redirect("/login");
            }
            else {
                res.render("tologin", {
                    resultIs: "User Already Exist",
                    resultMsg: "Login Now !",
                });
            }
        })
        .catch(err => console.log(err));
})


app.post("/tologin", function (req, res) {
    res.redirect("/login");
})
app.post("/toregister", function (req, res) {
    res.redirect("/register");
})




app.listen(3000, function () {
    console.log("Server started on port 3000 localhost");
});