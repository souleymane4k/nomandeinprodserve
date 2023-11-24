import mongoose from 'mongoose';
import {registerEvents} from './exchange.events';

var ExchangeSchema = new mongoose.Schema({
  datetime: String,
  fromuserxid: String,
  active: Boolean,
  amount:{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
},

});

registerEvents(ExchangeSchema);
export default mongoose.model('Exchange', ExchangeSchema);
