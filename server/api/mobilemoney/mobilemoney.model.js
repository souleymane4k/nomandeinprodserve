import mongoose from 'mongoose';
import {registerEvents} from './mobilemoney.events';

var MobilemoneySchema = new mongoose.Schema({
  Amount: String,
  providerurl: String,
  status: String,
  UserId:String
});

registerEvents(MobilemoneySchema);
export default mongoose.model('Mobilemoney', MobilemoneySchema);
