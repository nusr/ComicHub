import sharp from 'sharp';
import logger from './logger';

export default function convertImage(filePath: string, jpegPath: string): Promise<any> {
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
