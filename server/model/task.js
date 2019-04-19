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
    type: Date,
  },
  time_end:{
    type: Date,
  },
	created: {
		type: Date,
		required: true,
		default: Date.now
	},
  task_status:{
    type: Boolean,
  }

})

// Export
module.exports = db_task
