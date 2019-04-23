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
    required: [true, 'Task Name is required!']
  },
  time_start:{
    type: Date,
    required: [function() {
      return this.time_end;
    }, 'Task Start Time is required if you entered Task End Time!']
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
