import faye from 'faye';

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
            message.ext.accessToken = accessToken;

            // Carry on and send the message to the server
            callback(message);
        }
    };

    // add auth extension to client
    this.client.addExtension(_clientAuth);

    return this.client;
}

function subscribe() {
  console.log('subscribe', arguments);
  if (!this.client) {
    throw new Error('PubSub client hasn\'t been initialized.');
  }
  this.client.subscribe.apply(this.client, arguments);
}

export const bindEventToAction = (event, action) => {
  console.log(event, action);
  if (typeof action !== 'function') {
    throw new Error('action must be an action creator function')
  }
  PubSub.subscribe(event, function(data) {
    PubSub.dispatch(action(data));
  });
}