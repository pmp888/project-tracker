// Import db.js
const db = require('../db')
// Import mongoose from node_modules
const mongoose = require('mongoose')

let schema = mongoose.Schema
let ObjectId = schema.Types.ObjectId

// Create schema for task
const db_task = db.model('task', {
  task_name:{
    type: String,
    required:true,
  },
  time_start:{

  },
  time_end:{

  },
	created: {
		type: Date,
		required: true,
		default: Date.now
	}

})

// Export
module.exports = db_message
