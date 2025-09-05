import cors from "cors";
import dotenv from "dotenv";
import express, { type Application } from "express";
import swaggerUi from "swagger-ui-express";
import { AuthController } from "./controllers/authController";
import { swaggerSpec } from "./docs/swaggerConfiguration";
import { env } from "./env";
import { requestLogger } from "./middleware/requestLogger";
import { devDebugger } from "./utils/devDebugger";
import { drizzle } from "drizzle-orm/postgres-js";
import { StatusController } from "./controllers/statusController";
import postgres from "postgres";

dotenv.config();

export class App {
  app: Application;
  constructor() {
    this.app = express();
    this.config();
    this.checkConnection();
    this.routes();
    this.listen(env.PORT || 3000);
  }
  routes() {
    this.app.get("/", (_req, res) => res.redirect("/docs"));
    this.app.use("/status", new StatusController().router);
    this.app.use("/auth", new AuthController().router);
    this.app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
          validatorUrl: null,
          tryItOutEnabled: true,
          displayRequestDuration: true,
        },
      })
    );
  }
  config() {
    this.app.use(
      cors({
        origin: env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
      })
    );
    this.app.use(requestLogger);
    this.app.use(express.json());
  }
  listen(port: number | string) {
    this.app.listen(port, () => devDebugger(`Servidor rodando na porta ${port}`));
  }
  async checkConnection() {
    try {
      await App.getDb().execute("SELECT 1");
      devDebugger("Conectado ao PostgreSQL com sucesso!", "info");
    } catch (error) {
      devDebugger("Erro ao conectar ao PostgreSQL:", error, "error");
    }
  }
  static getDb() {
    const { DATABASE_URL } = env;
    const client = postgres(DATABASE_URL);
    const db = drizzle(client);
    return db;
  }
}

export default new App().app;
