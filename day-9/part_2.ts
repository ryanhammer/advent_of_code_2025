function determineRectangleCornerLocations (rectangleArea: RectangleArea): number[][] {
  const { firstCornerLocation, secondCornerLocation } = rectangleArea;

  if (firstCornerLocation[0] === secondCornerLocation[0] || firstCornerLocation[1] === secondCornerLocation[1]) {
    return [firstCornerLocation, secondCornerLocation];
  } else if (firstCornerLocation[0] < secondCornerLocation[0]) {
    if (secondCornerLocation[1] > firstCornerLocation[1]) {
      return [firstCornerLocation, [secondCornerLocation[0], firstCornerLocation[1]], secondCornerLocation, [firstCornerLocation[0], secondCornerLocation[1]]];
    } else {
      return [[firstCornerLocation[0], secondCornerLocation[1]], secondCornerLocation, [secondCornerLocation[0], firstCornerLocation[1]], firstCornerLocation]
    }
  } else {
    if (firstCornerLocation[1] > secondCornerLocation[1]) {
      return [secondCornerLocation, [firstCornerLocation[0], secondCornerLocation[1]], firstCornerLocation, [secondCornerLocation[0], firstCornerLocation[1]]];
    } else {
      return [[secondCornerLocation[0], firstCornerLocation[1]], firstCornerLocation, [firstCornerLocation[0], secondCornerLocation[1]], secondCornerLocation];
    }
  }
}

function filterOutWhiteTileRectangles (rectangleAreas: RectangleArea[], cornerLocations: number[][]): RectangleArea[] {
  return rectangleAreas.filter((area, ind) => {
    if (area.firstCornerLocation[0] === area.secondCornerLocation[0] || area.firstCornerLocation[1] === area.secondCornerLocation[1]) return true;
    
    const rectangleCorners = determineRectangleCornerLocations(area);
    
    return cornerLocations.some((cornerLocation) => {
      return cornerLocation[0] <= rectangleCorners[0][0] && cornerLocation[1] <= rectangleCorners[0][1];
    }) && cornerLocations.some((cornerLocation) => {
      return cornerLocation[0] >= rectangleCorners[1][0] && cornerLocation[1] <= rectangleCorners[1][1];
    }) && cornerLocations.some((cornerLocation) => {
      return cornerLocation[0] >= rectangleCorners[2][0] && cornerLocation[1] >= rectangleCorners[2][1];
    }) && cornerLocations.some((cornerLocation) => {
      return cornerLocation[0] <= rectangleCorners[3][0] && cornerLocation[1] >= rectangleCorners[3][1];
    });
  })
}

console.log(filterOutWhiteTileRectangles(determineAndSortAreas(exampleCorners), exampleCorners)[0].area);
console.log(determineAndSortAreas(puzzleInput)[20000]);
