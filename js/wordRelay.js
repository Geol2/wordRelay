export default class wordRelay {
    constructor(startWord) {
        this.key = "80A4E87AF0F0C80B0256891A062ADB72";
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
            // fetch(); 인증키 이슈??
            return true;
        } else {
            return false;
        }
    }

    isReadAPI(word) {
        const response = fetch("https://stdict.korean.go.kr/api/search.do?" +
                "key=" + this.key + 
                "&q=" + word +
                "&req_type=json"
            , {
            mode: 'no-cors',
            method: 'GET'
        });

        response.then(response => {
            debugger;
            console.log(response)
        });
        response.catch(error => {
            debugger;
            console.log(error);
        });
    }
    
    isUseWord(word) {
        if( this.usedWord.includes(word) ) {
            return false;
        }
        this.usedWord.push(word);
        return true;
    }

    isValidLength(word) {
        if(word.length >= 2 && word.length <= 20) {
            return true;
        }
        return false;
    }
    
    is(word) {
        if( this.isMatchWord(word) 
            && this.isUseWord(word)
            && this.isValidLength(word)
            && this.isReadAPI(word) ){
            return true;
        }
        return false;
    }

    draw(word) {
        document.getElementsByClassName("display-word")[0].innerText = word;
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