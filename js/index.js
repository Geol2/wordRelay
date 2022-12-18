export function drawStart(word) {
    let randomNum = Math.floor( Math.random() * 10 );
    
    document.getElementsByClassName("display-word")[0].innerText = word[randomNum];
    
    return word[randomNum];
}

export function test() {
    console.log(1);
}