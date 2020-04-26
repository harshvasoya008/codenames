export class PubSub {

    static publish = (channelName, ...args) => {
        /*global Ably*/
        const channel = Ably.channels.get(channelName);
        channel.publish(args[0], args[1], args[2]);
    }

    static subscribe = (channelName, ...args) => {
        const channel = Ably.channels.get(channelName);
        channel.subscribe(args[0]);
    }
}

export const handlePublishError = (err) => {
    if (err) {
        console.log('Unable to publish message; err = ' + err.message);
    }
}
