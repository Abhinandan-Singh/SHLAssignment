const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const {OpenAI} = require('openai');

// const config = new Configuration({
//   apiKey: "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"
// })

const openai = new OpenAI({
    apiKey: "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"
})


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
        const completion = await openai.completions.create({
            model: 'gpt-3.5-turbo',
            prompt: `Translate the user query '${userQuery}' into a structured search query for MongoDB database.`,
            max_tokens: 512,
            temperature: 0
        });
        console.log(completion);
    
        const generatedQuery = completion.choices[0].text;
        res.json({query: generatedQuery});
        //const searchResults = await executeDBQuery(generatedQuery);
    }catch(error){
        console.error();
    }
});

// async function executeDBQuery(query){
//     console.log(query);
// }











app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})