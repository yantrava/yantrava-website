import sharp from "sharp";
import potrace from "potrace";
import fs from "fs";
const { Potrace } = potrace;
const SRC = "brand/logo3.png";

function traceBuf(buf, outPath, label, turdSize = 6) {
  return new Promise((res, rej) => {
    const p = new Potrace({
      threshold: 160,
      turdSize,
      alphaMax: 0.4, // keep sharp geometric corners
      optCurve: true,
      optTolerance: 0.15,
      blackOnWhite: true,
      color: "#000000",
      background: "transparent",
    });
    p.loadImage(buf, (err) => {
      if (err) return rej(err);
      let svg = p.getSVG();
      svg = svg.replace(/fill="#000000"/g, 'fill="currentColor"');
      fs.writeFileSync(outPath, svg);
      const m = svg.match(/viewBox="([^"]+)"/);
      console.log(
        `${label}: ${(svg.length / 1024).toFixed(1)}KB  viewBox=${m ? m[1] : "?"}  paths=${(svg.match(/<path/g) || []).length}`,
      );
      res();
    });
  });
}

const full = await sharp(SRC)
  .flatten({ background: "#ffffff" })
  .trim({ threshold: 10 })
  .toBuffer();
const meta = await sharp(full).metadata();
console.log("trimmed lockup:", meta.width, "x", meta.height);
await traceBuf(full, "public/logo.svg", "logo (full lockup)");

// Find the mark | wordmark split by scanning columns for the widest whitespace gap
// (so neither piece is sliced — fixed fractions cut the "Y" or caught the bead).
const { data, info } = await sharp(full)
  .grayscale()
  .raw()
  .toBuffer({ resolveWithObject: true });
const W = info.width,
  H = info.height,
  CH = info.channels;
const colInk = new Array(W).fill(false);
for (let x = 0; x < W; x++) {
  for (let y = 0; y < H; y++) {
    if (data[(y * W + x) * CH] < 128) {
      colInk[x] = true;
      break;
    }
  }
}
// The mark and wordmark overlap in x (the "Y" nearly touches the mark), so a plain
// column gap can't separate them. The mark's triangle base + bead reach into the
// LOWER band where the wordmark caps don't — use that to find the mark's right edge.
void colInk;
const yLo = Math.floor(H * 0.66);
let markRight = 0;
for (let x = 0; x < W; x++) {
  for (let y = yLo; y < H; y++) {
    if (data[(y * W + x) * CH] < 128) {
      markRight = x;
      break;
    }
  }
}
const split = markRight + 7; // pad past the mark (clears its right-triangle tip)
console.log(`split at x=${split} (markRight=${markRight}, W=${W})`);

const markBuf = await sharp(full)
  .extract({ left: 0, top: 0, width: markRight, height: H })
  .trim({ threshold: 10 })
  .toBuffer();
const mm = await sharp(markBuf).metadata();
console.log("mark crop:", mm.width, "x", mm.height);
await traceBuf(markBuf, "public/logo-mark.svg", "logo-mark");

// wordmark — everything right of the split; higher turdSize removes any mark sliver
const wordBuf = await sharp(full)
  .extract({ left: split, top: 0, width: W - split, height: H })
  .trim({ threshold: 10 })
  .toBuffer();
const wm = await sharp(wordBuf).metadata();
console.log("word crop:", wm.width, "x", wm.height);
await traceBuf(wordBuf, "public/logo-word.svg", "logo-word", 30);
