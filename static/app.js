// async function button() {
//     let $formcontainer = $("#form-container");
//     let $form = $("#form")
//     $formcontainer.on('submit', $form, function (e) {
//         handleSubmit(e);
//         e.preventDefault();
//         console.log('click')
//         return res;
//     });
// }
// button();

// async function getBtnVal() {
//     let response = await axios.get("/");
//     console.log("got", response);
//     return response.data;
// }
//^my attempt at step Three, totally missed that I could just grab the word

/* handle submission of word: if unique and valid, score & show */
class BoggleGame {
    /* make a new game at this DOM id */

    constructor(boardId, secs = 60) {
        this.secs = secs; // game length
        this.showTimer();

        this.score = 0;
        this.words = new Set();
        this.board = $("#" + boardId);

        // every 1000 msec, "tick"
        this.timer = setInterval(this.tick.bind(this), 1000);

        $(".add-word", this.board).on("submit", this.handleSubmit.bind(this));
    };

    showWord(word) {
        $(".words", this.board).append($("<li>", {
            text: word
        }));
    }

    /* show score in html */

    showScore() {
        $(".score", this.board).text(this.score);
    }

    /* show a status message */

    showMessage(msg, cls) {
        $(".msg", this.board)
            .text(msg)
            .removeClass()
            .addClass(`msg ${cls}`);
    }

    async handleSubmit(e) {
        e.preventDefault(); //prevent page from refreshing
        const $word = $(".word", this.board); //grabs value of word using board for context
        console.log($word)
        let word = $word.val(); //grabbing the val with  jQuery
        if (!word) return;

        if (this.words.has(word)) {
            this.showMessage(`Already found ${word}`, "err");
            return;
        }

        // check server for validity
        const resp = await axios.get("/check-word", {
            params: {
                word: word
            }
        });
        if (resp.data.result === "not-word") {
            this.showMessage(`${word} is not a valid English word`, "err");
        } else if (resp.data.result === "not-on-board") {
            this.showMessage(`${word} is not a valid word on this board`, "err");
        } else {
            this.showWord(word);
            this.score += word.length;
            this.showScore();
            this.words.add(word);
            this.showMessage(`Added: ${word}`, "ok");
        }

    }
    /* end of game: score and update message. */

    async scoreGame() {
        $(".add-word", this.board).hide();
        const resp = await axios.post("/post-score", {
            score: this.score
        });
        if (resp.data.brokeRecord) {
            this.showMessage(`New record: ${this.score}`, "ok");
        } else {
            this.showMessage(`Final score: ${this.score}`, "ok");
        }
    }
}