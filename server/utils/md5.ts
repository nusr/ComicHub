import crypto from 'crypto';

export default function md5(content: any): string {
    return crypto
        .createHash('md5')
        .update(content)
        .digest('hex');
}
