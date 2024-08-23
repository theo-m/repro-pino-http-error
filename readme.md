# Sentry * Pino bug

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
Error: not happy
    at repro-sentry-logging/app.ts:25:9
    at Layer.handle [as handle_request] (repro-sentry-logging/node_modules/.pnpm/express@4.19.2/node_modules/express/lib/router/layer.js:95:5)
    at next (repro-sentry-logging/node_modules/.pnpm/express@4.19.2/node_modules/express/lib/router/route.js:149:13)
    at Route.dispatch (repro-sentry-logging/node_modules/.pnpm/express@4.19.2/node_modules/express/lib/router/route.js:119:3)
    at Layer.handle [as handle_request] (repro-sentry-logging/node_modules/.pnpm/express@4.19.2/node_modules/express/lib/router/layer.js:95:5)
    at repro-sentry-logging/node_modules/.pnpm/express@4.19.2/node_modules/express/lib/router/index.js:284:15
    at Function.process_params (repro-sentry-logging/node_modules/.pnpm/express@4.19.2/node_modules/express/lib/router/index.js:346:12)
    at next (repro-sentry-logging/node_modules/.pnpm/express@4.19.2/node_modules/express/lib/router/index.js:280:10)
    at loggingMiddleware (repro-sentry-logging/node_modules/.pnpm/pino-http@10.2.0/node_modules/pino-http/logger.js:206:7)
    at result (repro-sentry-logging/node_modules/.pnpm/pino-http@10.2.0/node_modules/pino-http/logger.js:90:12)
```

### What the logger emits

```text
Error: failed with status code 500
    at onResFinished (repro-sentry-logging/node_modules/.pnpm/pino-http@10.2.0/node_modules/pino-http/logger.js:115:39)
    at ServerResponse.onResponseComplete (repro-sentry-logging/node_modules/.pnpm/pino-http@10.2.0/node_modules/pino-http/logger.js:178:14)
    at repro-sentry-logging/node_modules/.pnpm/@opentelemetry+context-async-hooks@1.25.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/context-async-hooks/src/AbstractAsyncHooksContextManager.ts:75:49
    at AsyncLocalStorage.run (node:async_hooks:346:14)
    at SentryContextManager2.with (repro-sentry-logging/node_modules/.pnpm/@opentelemetry+context-async-hooks@1.25.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/context-async-hooks/src/AsyncLocalStorageContextManager.ts:40:36)
    at SentryContextManager2.with (repro-sentry-logging/node_modules/.pnpm/@sentry+opentelemetry@8.26.0_@opentelemetry+api@1.9.0_@opentelemetry+core@1.25.1_@opentelemet_febc6qex7hf5jytseaqgyjwsqm/node_modules/@sentry/opentelemetry/src/contextManager.ts:71:20)
    at ServerResponse.contextWrapper (repro-sentry-logging/node_modules/.pnpm/@opentelemetry+context-async-hooks@1.25.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/context-async-hooks/src/AbstractAsyncHooksContextManager.ts:75:22)
    at ServerResponse.emit (node:events:530:35)
    at onFinish (node:_http_outgoing:1005:10)
    at callback (node:internal/streams/writable:756:21)
```