export default function wait(millisecond: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecond);
  });
}
