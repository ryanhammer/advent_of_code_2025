function checkValueInRange(splitRange: string[], value: number): boolean {
  return (value >= Number(splitRange[0]) && value <= Number(splitRange[1]));
}

function determineFreshIngredientsInRange(ingredientRange: string): number {
  const splitRange = ingredientRange.split("-");

  return Number(splitRange[1]) - Number(splitRange[0]) + 1;
}

function determineTotalFreshIngredientIds (freshIngredientRanges: string[]): number {
  let totalFreshIngredientIds = 0;
  let uniqueFreshRanges: string[] = [];
  const freshRangeStartValues: number[] = [];
  const freshRangeEndValues: number[] = [];

  freshIngredientRanges.forEach((ingredientRange) => {
    if (uniqueFreshRanges.length === 0) {
      uniqueFreshRanges.push(ingredientRange);
      return;
    }

    const uniqueFreshRangesCopy = [...uniqueFreshRanges];

    const splitRange = ingredientRange.split("-");
    
    let newRange = '';

    const startValueRangeIndex = uniqueFreshRanges.findIndex((range) => checkValueInRange(range.split("-"), Number(splitRange[0])));
    const endValueRangeIndex = uniqueFreshRanges.findIndex((range) => checkValueInRange(range.split("-"), Number(splitRange[1])));

    if (startValueRangeIndex === -1 && endValueRangeIndex === -1) {
      newRange = ingredientRange;
    } else if (startValueRangeIndex === -1) {
      newRange = splitRange[0] + "-" + uniqueFreshRanges[endValueRangeIndex].split("-")[1];
    } else if (endValueRangeIndex === -1) {
      newRange = uniqueFreshRanges[startValueRangeIndex].split("-")[0] + "-" + splitRange[1];
    } else {
      if (startValueRangeIndex === endValueRangeIndex) {
        return;
      }
      newRange = uniqueFreshRanges[startValueRangeIndex].split("-")[0] + "-" + uniqueFreshRanges[endValueRangeIndex].split("-")[1];
    }


    uniqueFreshRangesCopy.forEach((freshRange, ind) => {
      const splitFreshRange = freshRange.split("-");
      const splitNewRange = newRange.split("-");

      if (Number(splitNewRange[0]) <= Number(splitFreshRange[0]) && Number(splitNewRange[1]) >= Number(splitFreshRange[1])) {
        uniqueFreshRangesCopy[ind] = newRange;
      } else {
        uniqueFreshRangesCopy.push(newRange);
      }
    })
    uniqueFreshRanges = [...new Set(uniqueFreshRangesCopy)];
  })

  uniqueFreshRanges.forEach(uniqueFreshRange => totalFreshIngredientIds += determineFreshIngredientsInRange(uniqueFreshRange));

  return totalFreshIngredientIds;
}

console.log(determineTotalFreshIngredientIds(exampleIngredientRanges));
console.log(determineTotalFreshIngredientIds(freshIngredientRanges));
