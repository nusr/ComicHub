import sharp from 'sharp';
import { pdfSupportImage } from '../shared';

export function getJpegPath(filePath: string): string {
  const temp: string[] = filePath.split('.');
  temp.pop();
  return temp.join('.') + pdfSupportImage[0];
}

export default function convertImage(filePath: string): Promise<any> {
  const jpegPath: string = getJpegPath(filePath);
  return sharp(filePath)
    .jpeg()
    .toFile(jpegPath);
}
