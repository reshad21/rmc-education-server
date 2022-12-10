const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const blogCollection = client.db("rmcEducation").collection("blogs");

        // users api
        app.post('/users',async(req,res)=>{
            const user = req.body;
            // console.log(user);
            const result = await usersCollection.insertOne(user);
            res.send(result)
        })

        // blogs api
        app.post('/blogs',async(req,res)=>{
            const content = req.body;
            console.log(content);
            const result = await blogCollection.insertOne(content);
            res.send(result);
        })

        app.get('/blogs', async (req, res) => {
            const query = {}
            const result = await blogCollection.find(query).toArray()
            res.send(result);

        })

        app.get('/blogs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await blogCollection.findOne(query);
            res.send(result)

        })

    } finally {

    }
}
run().catch(console.log)






app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})
