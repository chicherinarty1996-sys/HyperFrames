import http from "node:http";
import fs from "node:fs";
import {spawn} from "node:child_process";

const PORT = Number(process.env.PORT || 10000);
const TOKEN = process.env.RENDER_TOKEN || "";
let active = false;
let last = {status: "idle", startedAt: null, finishedAt: null, code: null};

function send(res, status, body, type = "application/json") {
  res.writeHead(status, {"Content-Type": type});
  res.end(typeof body === "string" ? body : JSON.stringify(body));
}

function authorized(req) {
  return !TOKEN || req.headers.authorization === `Bearer ${TOKEN}`;
}

function startRender() {
  if (active) return false;
  active = true;
  last = {status: "running", startedAt: new Date().toISOString(), finishedAt: null, code: null};
  fs.mkdirSync("out", {recursive: true});
  const child = spawn("npm", ["run", "render:pov"], {
    stdio: "inherit",
    env: {...process.env, REMOTION_BROWSER_EXECUTABLE_PATH: "/usr/bin/chromium"}
  });
  child.on("close", code => {
    active = false;
    last = {...last, status: code === 0 ? "completed" : "failed", finishedAt: new Date().toISOString(), code};
  });
  child.on("error", () => {
    active = false;
    last = {...last, status: "failed", finishedAt: new Date().toISOString(), code: -1};
  });
  return true;
}

http.createServer((req, res) => {
  console.log(`[HTTP] ${req.method} ${req.url}`);

  if (req.method === "GET" && req.url === "/")
    return send(res, 200, {
      ok: true,
      service: "HyperFrames Render",
      endpoints: ["/health", "/render", "/video"]
    });

  if (req.method === "GET" && req.url === "/health")
    return send(res, 200, {ok: true, active, last});

  if (req.method === "POST" && req.url === "/render") {
    if (!authorized(req)) return send(res, 401, {error: "Unauthorized"});
    if (!startRender()) return send(res, 409, {error: "Render already running", last});
    return send(res, 202, {ok: true, status: "started"});
  }

  if (req.method === "GET" && req.url === "/video") {
    const file = "out/pov-garage-rick.mp4";
    if (!fs.existsSync(file)) return send(res, 404, {error: "Video not ready", last});
    res.writeHead(200, {"Content-Type": "video/mp4"});
    return fs.createReadStream(file).pipe(res);
  }

  return send(res, 404, {error: "Not found"});
}).listen(PORT, "0.0.0.0", () => console.log(`HyperFrames Render server listening on ${PORT}`));
