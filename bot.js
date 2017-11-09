const Twit = require('twit');
const config = require('./config/twitter-keys');

const T = new Twit(config);

const stream = T.stream('user');
stream.on('follow', followed);

function followed(eventMsg) {
    console.log('On followed');
    const screenName = eventMsg.source.screen_name;
    sendDM(screenName,
        `Hey ${eventMsg.source.name} 😃 \n
TruBot thanks you for following @cloud_qa. You can check out our awesome codeless testing tools at cloudqa.io http://cloudqa.io`
    );
}

function sendDM(screenName, text) {
    const params = {
        screen_name: screenName,
        text: text
    };
    T.post("direct_messages/new", params)
        .then((message, response) => {
            console.log('Welcome message sent');
            console.log(message);
        })
        .catch(console.error);

}