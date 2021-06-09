// Insert separator between all elements ([a, b, c], s) => [a, s, b, s, c]
export const SeparateElements = (
  elements: JSX.Element[],
  separator: (key: string) => JSX.Element
) => {
  return elements.reduce((acc: JSX.Element[], element, index) => {
    const separatorKey = `${element.key || index}-separator`;
    return index === elements.length - 1
      ? acc.concat([element])
      : acc.concat([element, separator(separatorKey)]);
  }, []);
};
