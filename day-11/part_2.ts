function determineNumServerPathsOut(input: {[key: string]: string}): number {
  const inputKeys = Object.keys(input);

  const structuredInput: {[key: string]: string[]} = {};

  inputKeys.forEach((key) => {
    const valueArr = input[key].split(' ');
    structuredInput[key] = valueArr;
  });

  function checkPaths(finishedPaths: string[][], pathsToCheck: string[][]): string[][] {
    const unfinishedPaths: string[][] = [];

    pathsToCheck.forEach((path) => {
      const keyToCheck = path[path.length - 1];

      if (structuredInput[keyToCheck][0] === 'out') {
        finishedPaths.push([...path, 'out']);
      } else {
        structuredInput[keyToCheck].forEach((newPathKey) => {
          unfinishedPaths.push([...path, newPathKey]);
        });

        checkPaths(finishedPaths, unfinishedPaths);
      }
    });

    return finishedPaths;
  }

  const serverPathsOut = checkPaths([], [['svr']]);

  return serverPathsOut.filter(pathOut => pathOut.includes('fft') && pathOut.includes('dac')).length;
}
