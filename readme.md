# Pino Http bug

## Reproduction 

```shell
# 1. run 
pnpm start

# 2. run 
pnpm test
```

You'll observe that express does send the responses appropriately with the right errors - **but**, what's logged by Pino is entirely different.

### What the client receives

```text
> curl localhost:8080 | jq -r '.error.stack'

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1462  100  1462    0     0  20883      0 --:--:-- --:--:-- --:--:-- 21188
Error: not happy
    at /repro-sentry-logging/app.ts:23:9
    at Layer.handle [as handle_request] (/repro-sentry-logging/node_modules/.pnpm/express@4.19.2/node_modules/express/lib/router/layer.js:95:5)
    at next (/repro-sentry-logging/node_modules/.pnpm/express@4.19.2/node_modules/express/lib/router/route.js:149:13)
    at Route.dispatch (/repro-sentry-logging/node_modules/.pnpm/express@4.19.2/node_modules/express/lib/router/route.js:119:3)
    at Layer.handle [as handle_request] (/repro-sentry-logging/node_modules/.pnpm/express@4.19.2/node_modules/express/lib/router/layer.js:95:5)
    at /repro-sentry-logging/node_modules/.pnpm/express@4.19.2/node_modules/express/lib/router/index.js:284:15
    at Function.process_params (/repro-sentry-logging/node_modules/.pnpm/express@4.19.2/node_modules/express/lib/router/index.js:346:12)
    at next (/repro-sentry-logging/node_modules/.pnpm/express@4.19.2/node_modules/express/lib/router/index.js:280:10)
    at loggingMiddleware (/repro-sentry-logging/node_modules/.pnpm/pino-http@10.2.0/node_modules/pino-http/logger.js:206:7)
    at result (/repro-sentry-logging/node_modules/.pnpm/pino-http@10.2.0/node_modules/pino-http/logger.js:90:12)
```

### What the logger emits

```text
[14:28:14.237] INFO (52167): request errored {"req":{"id":1,"method":"GET","url":"/","query":{},"params":{},"headers":{"host":"localhost:8080","user-agent":"curl/8.6.0","accept":"*/*"},"remoteAddress":"::1","remotePort":50130},"res":{"statusCode":500,"headers":{"x-powered-by":"Express","content-type":"application/json; charset=utf-8","content-length":"1462","etag":"W/\"5b6-g3EC2/ru12Gn/Ky0ozTDg1MvZkg\""}},"responseTime":68}
    err: {
      "type": "Error",
      "message": "failed with status code 500",
      "stack":
          Error: failed with status code 500
              at onResFinished (/repro-sentry-logging/node_modules/.pnpm/pino-http@10.2.0/node_modules/pino-http/logger.js:115:39)
              at ServerResponse.onResponseComplete (/repro-sentry-logging/node_modules/.pnpm/pino-http@10.2.0/node_modules/pino-http/logger.js:178:14)
              at ServerResponse.emit (node:events:530:35)
              at onFinish (node:_http_outgoing:1005:10)
              at callback (node:internal/streams/writable:756:21)
              at afterWrite (node:internal/streams/writable:701:5)
              at afterWriteTick (node:internal/streams/writable:687:10)
              at processTicksAndRejections (node:internal/process/task_queues:81:21)
    }
```