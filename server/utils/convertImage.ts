import sharp from 'sharp';
import logger from './logger';
import { pdfSupportImage } from '../shared';

export function getJpegPath(filePath: string): string {
    const temp: string[] = filePath.split('.');
    temp.pop();
    return temp.join('.') + pdfSupportImage[0];
}

export default function convertImage(filePath: string): Promise<any> {
    const jpegPath: string = getJpegPath(filePath);
    return new Promise((resolve) => {
        sharp(filePath)
            .jpeg()
            .toFile(jpegPath)
            .catch((error: Error) => {
                if (!error) {
                    logger.info(`[Convert Image Success] ${jpegPath}`);
                    resolve(true);
                } else {
                    logger.error(`[Convert Image Error] ${jpegPath}`);
                    resolve(false);
                }
            });
    });
}
