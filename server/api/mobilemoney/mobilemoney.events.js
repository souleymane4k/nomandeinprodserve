/**
 * Mobilemoney model events
 */

import {EventEmitter} from 'events';
var MobilemoneyEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MobilemoneyEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Mobilemoney) {
  for(var e in events) {
    let event = events[e];
    Mobilemoney.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    MobilemoneyEvents.emit(event + ':' + doc._id, doc);
    MobilemoneyEvents.emit(event, doc);
  };
}

export {registerEvents};
export default MobilemoneyEvents;
