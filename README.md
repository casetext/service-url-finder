# service-url-finder
Get the URL for a service from the environment, either through Docker or overrides.

# Installation
```bash
npm install --save service-url-finder
```

# Usage
```bash
export REDIS_URL=redis://my.redis.host:6379
```

```js
var serviceUrlFinder = require('service-url-finder'):
console.log(serviceUrlFinder('redis', 6379)); // "redis://my.redis.host:6379"
```

# Signature
```js
function serviceUrlFinder(name, defaultPort, defaultHost, defaultProtocol) { ... }
```

# Behavior

service-url-finder first checks process.env for an environment variable
named ```SERVICE_NAME_URL``` and returns that.

If none is found, it checks for environment variables of the type Docker sets with links
(i.e., ```SERVICE_NAME_PORT_999_TCP```) and tries those.

Finally, it generates a string based on defaults that either you supply or it infers.

So assuming no environment variables, the call ```serviceUrlFinder('something-cool', 9999)``` will return ```something-cool://127.0.0.1:9999```.

# License

ISC.
