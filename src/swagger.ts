import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Income Expense Api",
  },
  host: "localhost:5000",

  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Enter: Bearer ",
    },
  },
  tags: [
    {
      name: "Authentication",
    },

    {
      name: "Transactions",
    },
  ],
};

const outputFile = "./swagger-output.json";
const routes = ["./app.ts"];

swaggerAutogen()(outputFile, routes, doc);
