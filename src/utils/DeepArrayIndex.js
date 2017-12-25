export default function deepIndex(deepArr, matchArr) {
  for (let i = 0; i < deepArr.length; i++) {
    if (deepArr[i][0] === matchArr[0] && deepArr[i][1] === matchArr[1]) {
      return i
    }
  }
}
