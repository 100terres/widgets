import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

function run() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const destPath = path.resolve(
    __dirname,
    "./src/assets/generated/downloaded-radar.png",
  );

  fetch(
    "https://geo.meteo.gc.ca/geomet?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=43.256666847747745,-76.77304180512725,47.761171352252255,-70.34536499487275&CRS=EPSG:4326&WIDTH=600&HEIGHT=600&LAYERS=RADAR_1KM_RRAI&FORMAT=image/png&TRANSPARENT=true",
  )
    .then((radarResult) => {
      return radarResult.arrayBuffer();
    })
    .then((arrayBuffer) => {
      const buffer = Buffer.from(arrayBuffer);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.writeFileSync(destPath, buffer);
    });
}

run();
