export default function wait(millisecond: number): Promise<any> {
  return new Promise(resolve => {
    setTimeout(resolve, millisecond);
  });
}
