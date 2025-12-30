import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "OpenBooks API",
      version: "1.0.0",
      description:
        "Open-source API exposing book metadata ingested from a public demo source designed for scraping practice.",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);
console.log("Swagger paths:", swaggerSpec.paths);

export default swaggerSpec;
