/**
 * Exchange model events
 */

import {EventEmitter} from 'events';
var ExchangeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ExchangeEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Exchange) {
  for(var e in events) {
    let event = events[e];
    Exchange.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    ExchangeEvents.emit(event + ':' + doc._id, doc);
    ExchangeEvents.emit(event, doc);
  };
}

export {registerEvents};
export default ExchangeEvents;
