function determineNumServerPathsOut(input: {[key: string]: string}): bigint {
  const inputKeys = Object.keys(input);

  const structuredInput: {[key: string]: string[]} = {};

  inputKeys.forEach((key) => {
    const valueArr = input[key].split(' ');
    structuredInput[key] = valueArr;
  });

  const memo = new Map<string, bigint>();

  function pathsFrom(node: string, hasFft: boolean, hasDac: boolean): bigint {
    const key = `${node}_${hasFft ? 1 : 0}_${hasDac ? 1 : 0}`;
    if (memo.has(key)) return memo.get(key)!;

    let total: bigint = 0n;
    const nextNodes = structuredInput[node] ?? [];

    for (const next of nextNodes) {
      if (next === 'out') {
        if (hasFft && hasDac) {
          total += 1n;
        }
      } else {
        const newFft = hasFft || (next === 'fft');
        const newDac = hasDac || (next === 'dac');
        total += pathsFrom(next, newFft, newDac);
      }
    }

    memo.set(key, total);
    return total;
  }

  const result = pathsFrom('svr', false, false);

  return result;
}

console.log(determineNumServerPathsOut(exampleInput));
console.log(determineNumServerPathsOut(input));
