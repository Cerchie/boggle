function button() {
    let $form = $("#form");
    $form.on('submit', function (e) {
        e.preventDefault();
        console.log('click')
    });
}
button();

async function getBtnVal() {
    let response = await axios.get("/");
    console.log("got", response);
    return response.data;
}