# Fast Speed Test

## Getting started
```
npm install
```

## Use
From within the directory, run
```
node index.js
```

You should see the relevant metrics in the terminal
```
DOWNLOAD: 23 Mbps
UPLOAD:   5.7 Mbps
```

### Pushbullet integration
It's also possible to configure the script to send the metrics via [Pushbullet](https://www.pushbullet.com/). You'll need to create `pushbullet.js` where you will export the `PUSHBULLET_API_KEY` as well as the specific `PUSHBULLET_DEVICE_ID`

```javascript
const PUSHBULLET_API_KEY = 'o.zyxwvutsrqponml';
const PUSHBULLET_DEVICE_ID = 'abcdefghijk1234';

module.exports = {
    PUSHBULLET_API_KEY,
    PUSHBULLET_DEVICE_ID,
};
```

To simultaneously send via Pushbullet, append `push` to the end of the terminal command
```
node index.js push
```

If the device is an iPhone, you will see the something like this

![ios_pushbullet](https://imgur.com/ncJsAIX.png)
