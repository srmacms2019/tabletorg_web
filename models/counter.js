var mongoose = require('mongoose');
var CounterSchema = new mongoose.Schema({
  _id :{
    type: String,
    required: ture
  },
  count : {
    type: Number,
    required: true
  }
});

var Counter = mongoose.model('counter',CounterSchema);
module.exports = Counter;
