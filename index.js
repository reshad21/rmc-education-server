const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('server is running');
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gplljg9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const usersCollection = client.db("rmcEducation").collection("users");

        app.post('/users',async(req,res)=>{
            const user = req.body;
            // console.log(user);
            const result = await usersCollection.insertOne(user);
            res.send(result)
        })

    } finally {

    }
}
run().catch(console.log)






app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})
