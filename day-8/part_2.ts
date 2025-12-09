interface junctionBoxDistance {
  distance: number;
  firstBoxIndex: number;
  secondBoxIndex: number;
}

function caluclateDistance (locationOne: number[], locationTwo: number[]): number {
  let distance = 0;

  for (let i = 0; i < locationOne.length; i++) {
    distance += Math.pow(locationOne[i] - locationTwo[i], 2);
  }

  return distance;
}

function determineAndSortDistances (junctionBoxLocations: number[][]): junctionBoxDistance[] {
  const junctionBoxDistances: junctionBoxDistance[] = [];

  for (let i = 0; i < junctionBoxLocations.length - 1; i++) {
    for (let j = i + 1; j < junctionBoxLocations.length; j++) {
      junctionBoxDistances.push({
        distance: caluclateDistance(junctionBoxLocations[i], junctionBoxLocations[j]),
        firstBoxIndex: i,
        secondBoxIndex: j,
      })
    }
  }

  return junctionBoxDistances.sort((a, b) => a.distance - b.distance);
}

function determineCircuits (junctionBoxLocations: number[][]): number {
  const circuits: number[][] = [];

  const sortedJunctionBoxes = determineAndSortDistances(junctionBoxLocations);
  let lastConnection: junctionBoxDistance = sortedJunctionBoxes[0];

  for (let i = 0; i < sortedJunctionBoxes.length; i++) {
    const { firstBoxIndex, secondBoxIndex } = sortedJunctionBoxes[i];

    const firstBoxCircuitIndex = circuits.findIndex(circuit => circuit.includes(firstBoxIndex));
    const secondBoxCircuitIndex = circuits.findIndex(circuit => circuit.includes(secondBoxIndex));

    if (firstBoxCircuitIndex === -1 && secondBoxCircuitIndex === -1) {
      circuits.push([firstBoxIndex, secondBoxIndex]);
    } else if (firstBoxCircuitIndex === secondBoxCircuitIndex) {
      continue;
    } else if (firstBoxCircuitIndex === -1) {
      circuits[secondBoxCircuitIndex].push(firstBoxIndex);
    } else if (secondBoxCircuitIndex === -1) {
      circuits[firstBoxCircuitIndex].push(secondBoxIndex);
    } else {
      const newCircuit = [...circuits[firstBoxCircuitIndex], ...circuits[secondBoxCircuitIndex]];

      circuits[firstBoxCircuitIndex] = newCircuit;
      circuits.splice(secondBoxCircuitIndex, 1);
    }

    if (circuits.length === 1 && circuits[0].length === junctionBoxLocations.length) {
      lastConnection = sortedJunctionBoxes[i];
      break;
    }
  }

  return junctionBoxLocations[lastConnection.firstBoxIndex][0] * junctionBoxLocations[lastConnection.secondBoxIndex][0];
}

console.log(determineCircuits(exampleJunctionBoxLocations));
console.log(determineCircuits(junctionBoxLocations));
