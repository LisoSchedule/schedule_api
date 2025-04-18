import swaggerJSDoc from "swagger-jsdoc";
import env from "./env";

export default swaggerJSDoc({
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Schedule API",
      version: "1.0.0",
      description:
        "RESTful API for managing university schedules, assignments, and reminders, integrated with a Telegram bot interface",
      contact: {
        name: "Andrew Kononenko [wastardy]",
        email: "wastardy.k@gmail.com",
      },
    },
    servers: [
      {
        url: env.BASE_URL,
      },
    ],
  },
  apis: ["./*.ts", "./**/*.ts"],
});
