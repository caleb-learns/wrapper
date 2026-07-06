# wrapper

A tiny wrapper around the JSONPlaceholder fake REST API, useful for prototyping.

## Usage

```js
const JsonPlaceholderClient = require('./index');

const client = new JsonPlaceholderClient({ apiKey: 'YOUR_API_KEY' });

client.getPrice ? client.getPrice(['bitcoin']).then(console.log) : null;
```

No external dependencies — uses Node's built-in `https` module.

## License

MIT
