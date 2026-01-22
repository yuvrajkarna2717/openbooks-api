import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "OpenBooks API",
      version: "1.0.0",
      description: "Open-source API exposing book metadata from books.toscrape.com with Supabase PostgreSQL backend.",
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' ? 'https://openbooks-api-ctit.onrender.com/' : 'http://localhost:5000',
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
