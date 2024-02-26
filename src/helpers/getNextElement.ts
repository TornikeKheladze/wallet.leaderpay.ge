export const getNextElement = <T>(arr: T[], currentIndex: number): T => {
  if (arr.length === 0) {
    throw new Error("Array is empty");
  }
  const nextIndex = (currentIndex + 1) % arr.length;
  return arr[nextIndex];
};
