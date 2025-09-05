import { env } from "../env";
import { App } from "../app";
import type { JSONValue } from "postgres";

export class StatusService {
  async getStatus() {
    const database: {
      status: string;
      latencia: string;
      conexoes?: JSONValue;
      versao?: JSONValue;
      erro?: string;
    } = {
      status: "",
      latencia: "",
    };
    const server: {
      status: string;
      ambiente: string;
      timezone: string;
      versao_node: string;
      plataforma: string;
      regiao: string;
    } = {
      status: "healthy",
      ambiente: env.NODE_ENV || "development",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      versao_node: process.version,
      plataforma: process.platform,
      regiao: "oregon-us-west",
    };

    try {
      const start = Date.now();
      await App.getDb().execute("SELECT 1");
      const latency = Date.now() - start;

      database.status = "healthy";
      database.latencia = `${latency}ms`;
    } catch (err: unknown) {
      database.status = "unhealthy";
      database.erro = (err as Error).message;
    }

    return {
      updatedAt: new Date().toISOString(),
      database,
      server,
    };
  }
}
