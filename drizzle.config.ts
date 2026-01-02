import { readConfig } from "./src/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "src/lib/db",
  out: "src/lib/generated",
  dialect: "postgresql",
  dbCredentials: {
    url: readConfig().dbUrl,
  },
});
