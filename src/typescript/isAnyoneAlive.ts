/**
 * проверка что есть живые клетки
 * @param field {number[][]} - состояние поля
 * @return {boolean}
 */
export function isAnyoneAlive(field: number[][]): boolean {
  for (let i = 0; i < field.length; i++) {
    const row = field[i];
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      if (cell) {
        return true;
      }
    }
  }
  return false;
}