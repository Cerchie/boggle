async function button() {
    let $formcontainer = $("#form-container");
    let $form = $("#form")
    $formcontainer.on('submit', $form, function (e) {
        handleSubmit(e);
        e.preventDefault();
        console.log('click')
        return res;
    });
}
button();

// async function getBtnVal() {
//     let response = await axios.get("/");
//     console.log("got", response);
//     return response.data;
// }
//^my attempt at step Three, totally missed that I could just grab the word

/* handle submission of word: if unique and valid, score & show */

async handleSubmit(e) {
    e.preventDefault(); //prevent page from refreshing
    const $word = $(".word", this.board); //grabs value of word using board for context

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