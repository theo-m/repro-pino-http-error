import "source-map-support/register";
import "./instrumentation";
import express, { type ErrorRequestHandler } from "express";
import { pinoHttp } from "pino-http";
import * as Sentry from "@sentry/node";

import pino from "pino";

const app = express();
app.use(
  pinoHttp({
    logger: pino({
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          singleLine: true,
        },
      },
    }),
  }),
);

app.get("/", (_req, _res) => {
  throw new Error("not happy");
});

Sentry.setupExpressErrorHandler(app);

const errHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  return res
    .status(500)
    .json({ error: { name: err.name, message: err.message, stack: err.stack } })
    .end();
};

app.use(errHandler);

const port = process.env.PORT ? Number(process.env.PORT) : 8080;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
