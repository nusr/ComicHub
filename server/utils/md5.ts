import crypto, { BinaryLike } from 'crypto';

export default function md5(content: BinaryLike): string {
  return crypto
    .createHash('md5')
    .update(content)
    .digest('hex');
}
