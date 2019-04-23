// Import db.js
const db = require('../db')
// Import mongoose from node_modules
const mongoose = require('mongoose')

let schema = mongoose.Schema
let ObjectId = schema.Types.ObjectId

// Create schema for task
// pt_task -> singular here, pl in database
const db_task = db.model('pt_task', {
  task_name:{
    type: String,
    required: [true, 'no_name']
  },
  time_start:{
    type: Date,
    required: [true, 'Needs Time Start']
  }
  ,
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
