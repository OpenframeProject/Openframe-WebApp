import faye from 'faye';
import { getToken } from '../services/auth';
import { actions as notifActions } from 'redux-notifications';
const { notifSend, notifDismiss } = notifActions;

const PubSub = {
  client: null,
  init: init,
  connect: connect,
  subscribe: subscribe
};

export default PubSub;

function init(store) {
  this.dispatch = store.dispatch;
}

function connect(psUrl, accessToken) {
    // create client
    this.client = new faye.Client(psUrl, {
        timeout: 60,
        retry: 10
    });

    // define auth extension
    let _clientAuth = {
        outgoing: function(message, callback) {
            if (message.channel !== '/meta/subscribe' && message.channel !== '/meta/publish') {
                return callback(message);
            }

            // Add ext field if it's not present
            if (!message.ext) {
                message.ext = {};
            }

            // Set the auth token
            message.ext.accessToken = getToken();

            // Carry on and send the message to the server
            callback(message);
        }
    };

    // add auth extension to client
    this.client.addExtension(_clientAuth);

    // add notification if realtime connection to server is lost
    this.client.on('transport:down', () => {
      let notification = {
        message: 'There is a problem connecting to Openframe server.',
        kind: 'danger',
        id: 'no-network'
      }
      this.dispatch(notifSend(notification));
    });

    this.client.on('transport:up', () => {
      this.dispatch(notifDismiss('no-network'));
    });

    return this.client;
}

/**
 * Pass-through to the Faye client's subscribe method
 */
function subscribe() {
  if (!this.client) {
    throw new Error('PubSub client hasn\'t been initialized.');
  }
  this.client.subscribe.apply(this.client, arguments);
}

/**
 * Pass through to the Faye client's unsubscribe method
 */
function unsubscribe() {
  if (!this.client) {
    throw new Error('PubSub client hasn\'t been initialized.');
  }
  this.client.unsubscribe.apply(this.client, arguments);
}

export const bindEventToAction = (event, action) => {
  if (typeof action !== 'function') {
    throw new Error('action must be an action creator function')
  }
  PubSub.subscribe(event, function(data) {
    PubSub.dispatch(action(data));
  });
}

// TODO: Implement me! Maybe we keep a list of frame events somewhere? Unclear from the Faye docs how
// we'd unsubscribe from all channels containing some string, e.g. frame.id
export const unbindFrameEvents = (frame) => {
  // PubSub.unsubscribe(...)
}