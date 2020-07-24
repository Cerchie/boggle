async function button() {
    let button = document.getElementById("submit-btn");
    button.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('click')
    });
}

await button();