export function getRandomImageLink(width, height) {
  return `https://picsum.photos/${width}/${height}?random=${Math.floor(
    Math.random() * 100
  )}`;
}
