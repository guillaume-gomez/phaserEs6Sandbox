
export function isInside(compared, comparator) {
  const rectCompared = {x: compared.x, y: compared.y, x2: compared.x + compared.width, y2: compared.y + compared.height};
  const rectComparator = {x: comparator.x, y: comparator.y, x2: comparator.x + comparator.width, y2: comparator.y + comparator.height}

  return rectCompared.x > rectComparator.x    &&
         rectCompared.y > rectComparator.y    &&
         rectCompared.x2 < rectComparator.x2  &&
         rectCompared.y2 < rectComparator.y2
}

export function overlap(box1, box2) {
    if (box1.x + box1.width < box2.x) return false; // a is left of b
    if (box1.x > box2.x + box2.width) return false; // a is right of b
    if (box1.y + box1.height < box2.y) return false; // a is above b
    if (box1.y > box2.y + box2.height) return false; // a is below b
    return true; // boxes overlap
}

export function overlapWithDifference(box1, box2) {
  let output = {};
  output.x = Math.max(box1.x, box2.x);
  output.y = Math.max(box1.y, box2.y);
  output.width = Math.min(box1.right, box2.right) - output.x;
  output.height = Math.min(box1.bottom, box2.bottom) - output.y;
  return [overlap(box1, box2), output];
}

export function modGrid(modValue, value) {
  const offset = value % modValue;
  console.log(value + (modValue - offset));
  return value + (modValue - offset);
}