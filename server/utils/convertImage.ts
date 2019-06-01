import sharp from 'sharp';
import logger from './logger';
import imageConverter from 'webp-converter';

export default function convertImage(
    filePath: string,
    jpegPath: string
) {
    sharp(filePath)
        .jpeg()
        .toFile(jpegPath)
        .catch((error: Error) => {
            if (!error) {
                logger.info(`[Convert Image Success] ${jpegPath}`);
                return;
            }
            logger.error(error);
            imageConverter.dwebp(
                filePath,
                jpegPath,
                '-o',
                (status: number, convertError: Error) => {
                    if (status !== 100) {
                        logger.error(convertError);
                    } else {
                        logger.info(`[Convert Image Success] ${jpegPath}`);
                    }
                }
            );
        });
}

