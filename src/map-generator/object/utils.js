
export function isInside(compared, comparator) {
  const rectCompared = {x: compared.x, y: compared.y, x2: compared.x + compared.width, y2: compared.y + compared.height};
  const rectComparator = {x: comparator.x, y: comparator.y, x2: comparator.x + comparator.width, y2: comparator.y + comparator.height}

  return rectCompared.x > rectComparator.x    &&
         rectCompared.y > rectComparator.y    &&
         rectCompared.x2 < rectComparator.x2  &&
         rectCompared.y2 < rectComparator.y2
}