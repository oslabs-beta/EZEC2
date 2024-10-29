const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: 'ezec2-jobs',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;
const jobSchema = new Schema({
  cronSchedule: String,
  jobType: String,
  instanceId: Array,
});

const Job = mongoose.model('jobs', jobSchema);

module.exports = {
  Job,
};
