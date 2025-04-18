import swaggerUi from "swagger-ui-express";
import basicAuth from "express-basic-auth";
import swaggerDocumentType from "../../swagger";
import env from "../../env";
import { Operation } from "../../types/swagger-operation.type";
import { Express } from "express";

const swaggerDocument: any = swaggerDocumentType;

const adminPassword = env.ADMIN_PASSWORD || "admin";

function operationSorter(operationA: Operation, operationB: Operation): number {
  const order: string[] = ["get", "post", "put", "patch", "delete"];
  return (
    order.indexOf(operationA.get("method")) -
    order.indexOf(operationB.get("method"))
  );
}

export const setupSwagger = (app: Express) => {
  app.use(
    ["/api-docs"],
    basicAuth({
      users: {
        admin: adminPassword,
      },
    })
  );

  const swaggerOptions = {
    swaggerOptions: {
      tagsSorter: "alpha",
      operationsSorter: operationSorter,
    },
  };

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, swaggerOptions)
  );
};
