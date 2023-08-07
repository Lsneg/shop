import fastify from "fastify";
import cors from "@fastify/cors";
import fs from "fs";

const server = fastify();

server.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 600,
  preflightContinue: false,
});

server.get("/api/v1/brands", async (request, reply) => {
  return fs.readFileSync("./mocks/brands.json", "utf8");
});

server.get("/api/v1/catalog", async (request, reply) => {
  return fs.readFileSync("./mocks/catalog.json", "utf8");
});

server.get("/api/v1/stock", async (request, reply) => {
  return fs.readFileSync("./mocks/stock.json", "utf8");
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
