const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true,
    },
    priority:{
        type:String,
        required: true,
    },
    checklist:{
        type: Array,
        required: true,
    },
    dueDate:{
        type: Date,
    },

    todo:{
        type: String,
    },
    backlog:{
        type: String,
    },
    progress:{
        type: String,
    },
    done:{
        type: String,
    },
    
    refUserId:{
        type: mongoose.ObjectId,
    },

}, { timestaps:{ createAt : "createAt", updatedAt:"updatedAt"}}
);

module.exports = mongoose.model('jiraticket', ticketSchema);
