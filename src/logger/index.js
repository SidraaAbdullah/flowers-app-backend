const winston = require("winston");
require("winston-daily-rotate-file");
const { createLogger, format } = winston;
const { combine, timestamp, prettyPrint, printf } = format;
const appRoot = require("app-root-path");
// meta param is ensured by splat()
const myFormat = printf(({ timestamp, level, message, meta }) => {
  return `${timestamp};${level};${message};${meta ? JSON.stringify(meta) : ""}`;
});
const rootTransport = new winston.transports.DailyRotateFile({
  filename: "root-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  dirname: appRoot + "/src/logs"
});
const rootLogger = createLogger({
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    prettyPrint(),
    myFormat
  ),
  transports: [rootTransport]
});

const apiTransport = new winston.transports.DailyRotateFile({
  filename: "api-logs-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  dirname: appRoot + "/src/logs"
});
const apiLogger = createLogger({
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    prettyPrint(),
    myFormat
  ),
  transports: [apiTransport]
});

const schedulerTransport = new winston.transports.DailyRotateFile({
  filename: "scheduler-logs-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  dirname: appRoot + "/src/logs"
});
const schedulerLogger = createLogger({
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    prettyPrint(),
    myFormat
  ),
  transports: [schedulerTransport]
});
const timeTransport = new winston.transports.DailyRotateFile({
  filename: "time-logging-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  dirname: appRoot + "/src/logs"
});
const timeLogger = createLogger({
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    prettyPrint(),
    myFormat
  ),
  transports: [timeTransport]
});
// if (process.env.NODE_ENV !== "production") {
//   rootLogger.add(
//     new winston.transports.Console({
//       format: winston.format.simple()
//     })
//   );
//   apiLogger.add(
//     new winston.transports.Console({
//       format: winston.format.simple()
//     })
//   );
// }
module.exports = {
  rootLogger: rootLogger,
  apiLogger: apiLogger,
  schedulerLogger: schedulerLogger,
  timeLogger: timeLogger
};
