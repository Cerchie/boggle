function button() {
    let $formcontainer = $("#form-container");
    $formcontainer.on('submit', "#form", function (e) {
        e.preventDefault();
        console.log('click')
    });
}
button();

// async function getBtnVal() {
//     let response = await axios.get("/");
//     console.log("got", response);
//     return response.data;
// }