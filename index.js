const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());

const data = fs.readFileSync("./users.json", "utf8");
const users = JSON.parse(data);

// For get all users
app.get("/", (req, res) => {
  res.send(users);
});

// get user by id
app.get("/users/id/:id", (req, res) => {
  let id = req.params.id;
  try {
    let user = users.find((el) => el.id === parseInt(id));

    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User id not found invalid id");
    }
  } catch (error) {
    console.log(error);
  }
});

// get user by city
app.get("/users/city/:city", (req, res) => {
  let city = req.params.city;
  
  try {
    let usersSameCity = users.filter((el) => el.city === city);

    if (usersSameCity.length > 0) {
      res.send(usersSameCity);
    } else {
      res.status(404).send("User not found invalid city");
    }
  } catch (error) {
    console.log(error);
  }
});

// get user by company name
app.get("/users/company/:company", (req, res) => {
    let company = req.params.company;
    try {
      let usersSameCompany = users.filter((el) => el.company === company);
  
      if (usersSameCompany.length > 0) {
        res.send(usersSameCompany);
      } else {
        res.status(404).send("User not found invalid company name");
      }
    } catch (error) {
      console.log(error);
    }
  });
  

// add users
app.post("/adduser", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  fs.writeFileSync("./users.json", JSON.stringify(users));
  res.send(newUser);
});

// delete user
app.post("/deleteuser/:id", (req, res) => {
  try {
    let id = req.params.id;

    let deteleUser = users.filter((el) => el.id !== parseInt(id));

    // for check user
    if (deteleUser.length === users.length) {
      return res.status(404).send("User id not found");
    }

    fs.writeFileSync("./users.json", JSON.stringify(deteleUser));

    res.send("User deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});


// update user
app.put("/updateuser/:id", (req, res) => {
  try {
    const id = req.params.id;

    const updatedData = req.body;

    const userUpdate = users.findIndex((el) => el.id === parseInt(id));

     // for check user
    if (userUpdate === -1) {
      return res.status(404).send("User id not found");
    }

    users[userUpdate] = { ...users[userUpdate], ...updatedData };

    fs.writeFileSync("./users.json", JSON.stringify(users));

    res.send(users[userUpdate]);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("server work at port 3000");
});
