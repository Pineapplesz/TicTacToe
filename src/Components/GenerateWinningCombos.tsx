type Props = {};

function GenerateWinningCombos(size: number): number[][] {
  const combos = [];

  // Rows
  for (let row = 0; row < size; row++) {
    const combo = [];
    for (let col = 0; col < size; col++) {
      combo.push(row * size + col);
    }
    combos.push(combo);
  }

  // Columns
  for (let col = 0; col < size; col++) {
    const combo = [];
    for (let row = 0; row < size; row++) {
      combo.push(row * size + col);
    }
    combos.push(combo);
  }

  // Diagonal top-left to bottom-right
  const diag1 = [];
  for (let i = 0; i < size; i++) {
    diag1.push(i * size + i);
  }
  combos.push(diag1);

  // Diagonal top-right to bottom-left
  const diag2 = [];
  for (let i = 0; i < size; i++) {
    diag2.push(i * size + (size - 1 - i));
  }
  combos.push(diag2);

  return combos;
}

export default GenerateWinningCombos;
