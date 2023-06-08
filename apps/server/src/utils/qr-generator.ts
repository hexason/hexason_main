import * as QrCodeJS from 'qrcode';
import { createCanvas, loadImage, Image, Canvas } from 'canvas';

function renderRect(ctx: any, x: number, y: number, width: number, height: number) {
  ctx.fillRect(x, y, width, height);
}
function renderCorner(ctx: any, x: number, y: number, size: number, deg: 0 | 1 | 2 | 3) {
  const lSize = size * 2;
  ctx.beginPath();
  switch (deg) {
    case 0:
      ctx.moveTo(x, y + lSize);
      ctx.bezierCurveTo(x, y + size, x + size, y, x + lSize, y);
      ctx.lineTo(x + lSize, y + size);
      ctx.bezierCurveTo(x + 1.5 * size, y + size, x + size, y + 1.5 * size, x + size, y + lSize);
      break;
    case 1:
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x + size, y, x + lSize, y + size, x + lSize, y + lSize);
      ctx.lineTo(x + size, y + lSize);
      ctx.bezierCurveTo(x + size, y + 1.5 * size, x + 0.5 * size, y + size, x, y + size);
      break;
    case 2:
      ctx.moveTo(lSize + x, y);
      ctx.bezierCurveTo(lSize + x, y + size, x + size, lSize + y, x, lSize + y);
      ctx.lineTo(x, y + size);
      ctx.bezierCurveTo(x + 0.5 * size, y + size, x + size, y + 0.5 * size, x + size, y);
      break;
    case 3:
      ctx.moveTo(x + lSize, y + lSize);
      ctx.bezierCurveTo(x + size, y + lSize, x, y + size, x, y);
      ctx.lineTo(x + size, y);
      ctx.bezierCurveTo(x + size, y + 0.5 * size, x + 1.5 * size, y + size, x + lSize, y + size);
      break;
    default:
      break;
  }
  ctx.fill();
}

function drawImageCentered(canvas: Canvas, image: Image, x: number) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const maxWidth = canvasWidth * 0.2;
  const imageRatio = image.naturalWidth / image.naturalHeight;

  let imageWidth = Math.floor(maxWidth / x) * x;
  if (maxWidth - imageWidth < x / 2) {
    imageWidth += x;
  }

  const imageHeight = imageWidth / imageRatio;
  const xCoord = (canvasWidth - imageWidth) / 2;
  const yCoord = (canvasHeight - imageHeight) / 2;

  ctx.drawImage(image, xCoord, yCoord, imageWidth, imageHeight);
}

export const pixelSize = 48;
const padsize = pixelSize / 12;
export const render = (type: any, context: any, col: number, row: number) => {
  switch (type) {
    case 'square1':
      return renderRect(
        context,
        col * pixelSize + padsize,
        row * pixelSize + padsize,
        pixelSize - 2 * padsize,
        pixelSize - 2 * padsize,
      );
    case 'square2':
      return renderRect(context, col * pixelSize + padsize, row * pixelSize, pixelSize - 2 * padsize, pixelSize);
  }
};

export const RenderFrame = (size: number, shape: any, outerCanvas: Canvas, canvas: Canvas, pathColor: any) => {
  return RenderSqure(size, shape, outerCanvas, canvas, pathColor);
};

const RenderSqure = async (size: number, shape: any, outerCanvas: Canvas, canvas: Canvas, pathColor: any) => {
  const outerContext = outerCanvas.getContext('2d');
  if (!outerContext) {
    return;
  }

  const size_ = size + 8;
  outerCanvas.width = size_ * pixelSize;
  outerCanvas.height = size_ * pixelSize;

  outerContext.drawImage(canvas, 4 * pixelSize, 4 * pixelSize);

  outerContext.fillStyle = pathColor;
  for (let i = 2; i < size_ - 2; i++) {
    outerContext.fillRect(0, i * pixelSize, pixelSize, pixelSize);
    outerContext.fillRect(i * pixelSize, 0, pixelSize, pixelSize);
    outerContext.fillRect(i * pixelSize, (size_ - 1) * pixelSize, pixelSize, pixelSize);
    outerContext.fillRect((size_ - 1) * pixelSize, i * pixelSize, pixelSize, pixelSize);
  }
  renderCorner(outerContext, 0, 0, pixelSize, 0);
  renderCorner(outerContext, (size_ - 2) * pixelSize, 0, pixelSize, 1);
  renderCorner(outerContext, 0, (size_ - 2) * pixelSize, pixelSize, 3);
  renderCorner(outerContext, (size_ - 2) * pixelSize, (size_ - 2) * pixelSize, pixelSize, 2);

  for (let i = 2; i < size_ - 2; i++) {
    if (i % 3 === 1 || i % 5 === 1) render(shape, outerContext, 2, i);
    if (i % 5 === 1 || i % 2 === 0) render(shape, outerContext, i, 2);
    if (i % 7 === 1 || i % 3 === 0) render(shape, outerContext, i, size_ - 3);
    if (i % 3 === 2 || i % 5 === 1) render(shape, outerContext, size_ - 3, i);
  }
};

export const QrPainterNode = async (props: any) => {
  const { data, imgBuffer, pathColor } = props;

  const canvas = createCanvas(pixelSize, pixelSize);
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Failed to get 2D context of canvas');
  }
  const { modules } = QrCodeJS.create(data, {
    errorCorrectionLevel: 'H',
  });

  const size = modules.size;
  context.fillStyle = pathColor;
  const p10 = size / 10;
  const half = size / 2;
  canvas.width = size * pixelSize;
  canvas.height = size * pixelSize;

  for (let i = 0; i < modules.data.length; i++) {
    const col = i % size;
    const row = Math.floor(i / size);
    if (modules.data[i]) {
      if ((row < 7 && (col < 7 || size - 7 <= col)) || (size - 7 <= row && col < 7)) {
        context.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
      } else {
        if (imgBuffer) {
          if (half - p10 - 1 > col || half + p10 < col || half - p10 - 1 > row || half + p10 < row) {
            render('square1', context, col, row);
          }
        } else {
          render('square1', context, col, row);
        }
      }
    }
  }

  if (imgBuffer) {
    const img = await loadImage(imgBuffer);
    drawImageCentered(canvas, img, pixelSize);
  }

  ///frame start

  const outerCanvas = createCanvas(pixelSize, pixelSize);
  RenderFrame(size, 'square1', outerCanvas, canvas, pathColor);

  ///frame end

  const base64 = outerCanvas.toBuffer('image/png');
  return base64;
};
