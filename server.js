import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicdir = path.join(__dirname, "public");

const mimeTypes = {
  ".txt": "text/plain",
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".gif": "image/gif",
};

const server = http.createServer((req, res) => {
  let filePath = path.join(publicdir, req.url === "/" ? "index.html" : req.url);
  let ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || "application/octet-stream";

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(404, { "content-type": "text/html" });
      res.end("<h1>404 Not Found</h1>");
      return;
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "content-type": "text/html" });
        res.end("<h1>500 : Internal Server Error</h1>");
      } else {
        res.writeHead(200, { "content-type": contentType });
        res.end(data);
      }
    });
  });
});

const PORT = 3000;
server.listen(PORT, () =>
  console.log(`Swerver is running and UP at Port No. ${PORT}`),
);
