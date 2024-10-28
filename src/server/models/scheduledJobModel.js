const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://jappleton101:yh5EIwZc5q4Q1Cmf@personal-database.n79iw9r.mongodb.net/';

mongoose
  .connect(MONGO_URI, {
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
