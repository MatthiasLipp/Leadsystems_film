import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");
const routes = ["impressum", "datenschutz", "agb", "avv"];

await copyFile(indexPath, path.join(distDir, "404.html"));

await Promise.all(
  routes.map(async (route) => {
    const routeDir = path.join(distDir, route);
    await mkdir(routeDir, { recursive: true });
    await copyFile(indexPath, path.join(routeDir, "index.html"));
  }),
);
