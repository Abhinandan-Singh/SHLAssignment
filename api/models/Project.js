const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
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
})

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;