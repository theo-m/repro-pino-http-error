import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://2976cbe08b3e3ba0d5e8bca86a5f7ad2@o4505470144479232.ingest.us.sentry.io/4507826819563520",
  tracesSampleRate: 1,
});
