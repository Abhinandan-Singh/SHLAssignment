const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: "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", // defaults to process.env["OPENAI_API_KEY"]
});

const dbSchema = {
    Project:{
        Title:{
            type: String,
            required: true
        },
        Technologies:{
            type: String,
            required: true
        }
    },
    Technical_Skillset:{
        Frontend:{
            type: String,
        },
        Backend:{
            type: String,
        },
        Databases:{
            type: String,
        },
        Infrastructure:{
            type: String,
        }
    },
    Other_Information:{
        Availability:{
            type: String,
        }
    }
};

const dbSchemaString = JSON.stringify(dbSchema);

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to DB");
}).catch(console.error);



const Project = require('./models/Project');

app.get('/projects', async(req, res) => {
    const projects = await Project.find();
    res.json(projects);
})

app.post('/smartSearch', async(req, res) => {
    try{
        const userQuery = req.body.text;
        const promptMessage = `The schema of my mongodb database is as following: 
        '${dbSchemaString}'
        Translate the user query ${userQuery} into a structured search query for the given MongoDB database. Return me the search query enclosed within triple #`;
        const completion = await openai.chat.completions.create({
            messages: [
                { 
                    role: 'user',
                    content: promptMessage,
                }],
            model: 'gpt-3.5-turbo',
          });
          
          
        const generatedQuery = completion.choices[0].message.content;
        const projects = await Project.find(generatedQuery.slice(3, -3));
        res.json(projects);
        //const searchResults = await executeDBQuery(generatedQuery);
    }catch(error){
        console.error();
    }
});













app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})