export function shuffle(array) {
    let m = array.length
    let temp
    let i
    while (m) {
      i = Math.floor(Math.random() * m--);
      temp = array[m];
      array[m] = array[i];
      array[i] = temp;
    }  
    return array;
}