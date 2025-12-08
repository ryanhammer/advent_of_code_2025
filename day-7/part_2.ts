function determineManifoldBeamPathCounts (manifold: string[]): number {
  let currentBeamPaths = manifold[0].split("").map(value => Number(value === "S"));

  for (let i = 2; i < manifold.length; i++) {
    if (i % 2 === 0) {
      let updatedBeamPaths = [...currentBeamPaths];
      for (let j = 0; j < currentBeamPaths.length; j++) {
        if (currentBeamPaths[j] > 0 && manifold[i][j] === "^") {
          updatedBeamPaths[j] = 0;
          updatedBeamPaths[j - 1] += currentBeamPaths[j];
          updatedBeamPaths[j + 1] += currentBeamPaths[j];
        }
      }
      currentBeamPaths = [...updatedBeamPaths];
    }
  }

  return currentBeamPaths.reduce((acc,num) => acc+num,0);
}

console.log(determineManifoldBeamPathCounts(exampleTachyonManifold));
console.log(determineManifoldBeamPathCounts(puzzleTachyonManifold));
