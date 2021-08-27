function randomString(length){
	const characters = 'abcdefghijklmnopqrstuvwxyz'//0123456789'
	let str = ""
	for (let i = 0; i < length; i++){
		str += characters[Math.floor(Math.random()*characters.length)]
	}
	return str
}

function shuffle(array) {
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

module.exports = { randomString, shuffle }