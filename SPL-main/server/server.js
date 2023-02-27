const express = require('express')
const bodyParser = require('body-parser')
const {MongoClient} = require('mongodb');
const User = require("./userModel");
const app = express()
 
const uri = "mongodb+srv://JosephArr12:MsKpx3PxfRpWuMaS@cluster-cst499.21wikv5.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const database = client.db("Database");
const userCollection = database.collection("user");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
 
app.get('/', (req, res) => {
  console.log("Called home route.")
  res.send({message:'Hello World!'})

})
 
app.post('/insertTest', async (req, res) => {
    let data = req.body;

    let userName = data['username']
    let password = data['password']

    const user = {
      name: userName,
      password: password,
    }

    const result = await userCollection.insertOne(user);
    res.send(user);
    //res.render({information}`A user was inserted with the _id: ${result.insertedId}`)
})

//Deleting

app.post('/deleteTest', async (req, res) => {
  let data = req.body;
  const query = { name: data['username'] };
  const result = await userCollection.deleteOne(query);
  if (result.deletedCount === 1) {
      res.send("Successfully deleted one document.");
  } else {
      res.send("No documents matched the query. Deleted 0 documents.");
  }
})

//Updating

app.post('/updateTest', async (req, res) => {
  let data = req.body;

  let userName = data['username']
  let newPassword = data['password']

    const filter = { name: userName };
    const options = { upsert: false };
    const updateDoc = {
        $set: {
        password: newPassword
      },
    };
    const result = await userCollection.updateOne(filter, updateDoc, options);
    res.send(
      result.acknowledged
    );
})

//Finding

app.post('/findTest', async (req, res) => {
  let data = req.body;

  let userName = data['username']

  const query = { name: userName };
  const user = await userCollection.findOne(query);
  if(user!=null){
    res.send("User found" + user);
  }
  else{
    res.send("User not found");
  }
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})


app.post('/login', async (req, res) => {
  let data = req.body;
  let email = data['email']
  const query = { email: email };
  const user = await userCollection.findOne(query);
  if(user != null){
    let password = user['password'];
    if(data['password'] === password){
      res.json({message:"Success",user:user['name']});
    }
    else{
      res.json({message:"Incorrect Password"});
    }
  }
  else{
    res.json({message:"User not found"});
  }
})


app.post('/signup', async (req, res) => {
  let data = req.body;
  let email = data['email']
  let name = data['name']
  let password = data['password']
  let phone = data['phone']
  const query = { email: email };
  const user = await userCollection.findOne(query);
  if(user == null){
    const user = {
      name: name,
      password: password,
      phone: phone,
      email: email,
    }
    const result = await userCollection.insertOne(user);
    res.json({message:"Success",user:name});
  }
  else{
    res.json({message:"Failure"});
  }
})


function  validatePassword(password, passwordCheck){
  //decrypt the hashed password here would be passwordCheck
  return (password == passwordCheck);
}