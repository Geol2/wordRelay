export default class wordRelay {
    constructor(startWord) {
        this.key = "BF798F78613F68086AAE9952E915A59C";
        this.startWord = startWord;
        
        this.isStart = true;
        this.state = 1;
        this.outTime = 0;
        this.haveTime = 0;
        this.exit = 0;

        this.usedWord = [];
        this.timeOutId = 0;
        this.timeIntervalId = 0;

        this.prevWord = '';
        this.nextWord = '';
    }
    
    setWord(word) {
        this.prevWord = word;
        this.isStart = false;
    }

    setUIState() {
        if(this.state == 1) {
            document.getElementsByClassName("user-1")[0].setAttribute("style", "border: solid 3px red");
        } else {
            document.getElementsByClassName("user-2")[0].setAttribute("style", "border: solid 3px red");
        }
    }

    setLimitTime(time) {
        this.outTime = time;
    }

    setHaveTime(time) {
        this.haveTime = time;
    }

    setPrevWord(word) {
        this.prevWord  = word;
    }

    getState() {
        return this.state;
    }

    flowTime() {
        const timeoutId = setTimeout(() => {
            this.win();
        }, this.outTime);
        this.timeOutId = timeoutId;
    }

    removeTime() {
        clearTimeout(this.timeOutId);
    }

    changeState() {
        if(this.state == 1) {
            this.state = 2;
            document.getElementsByClassName("user-1")[0].setAttribute("style", "border: none");
            document.getElementsByClassName("user-2")[0].setAttribute("style", "border: solid 3px red");
        } else {
            this.state = 1;
            document.getElementsByClassName("user-1")[0].setAttribute("style", "border: solid 3px red");
            document.getElementsByClassName("user-2")[0].setAttribute("style", "border: none");
        }
    }

    isMatchWord(next) {
        let nextWord = next;
        let prevWord = this.prevWord;
        
        let endWordOfPrevWord = prevWord.charAt(prevWord.length - 1);
        let firstWordOfNextWord = nextWord.charAt(0);

        if( endWordOfPrevWord == firstWordOfNextWord) {
            return true;
        } else {
            return false;
        }
    }

    isReadAPI(word) {
        let res = false;
        
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "/getApi?q=" + word, false);
        xhr.send();

        if(xhr.readyState === 4 && xhr.status === 200) {
            if( JSON.parse( xhr.response ).is ) {
                res = true;
            }
        }

        return res;
    }
    
    isUseWord(word) {
        if( this.usedWord.includes(word) ) {
            return false;
        }
        this.usedWord.push(word);
        return true;
    }

    isValidLength(word) {
        if( (word.length >= 2) && (word.length <= 20) ) {
            return true;
        }
        return false;
    }
    
    is(word) {
        if( this.isReadAPI(word)
            && this.isMatchWord(word) 
            && this.isUseWord(word)
            && this.isValidLength(word) ){
            return true;
        }
        return false;
    }

    draw(word) {
        document.getElementsByClassName("display-word")[0].innerText = word;
        document.getElementById("word").setAttribute("style", "border:solid 3px #27ae60");
        document.getElementById("word").value = '';
    }
    
    warning() {
        document.getElementById("word").setAttribute("style", "border:solid 3px red");
    }

    win() {
        if( this.state == 1 ) {
            document.getElementsByClassName("user-win")[0].innerText = '패배';
            document.getElementsByClassName("user-win")[1].innerText = '승리';
        } else {
            document.getElementsByClassName("user-win")[0].innerText = '승리';
            document.getElementsByClassName("user-win")[1].innerText = '패배';
        }

        document.getElementById("word").setAttribute("disabled", true);
    }
}