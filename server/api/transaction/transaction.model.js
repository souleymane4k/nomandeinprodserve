import mongoose from 'mongoose';
import {registerEvents} from './transaction.events';

var TransactionSchema = new mongoose.Schema({
  from: String,
  to: String,
  status: String,
  amount:Number,
  userid: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
},
});

registerEvents(TransactionSchema);
export default mongoose.model('Transaction', TransactionSchema);
