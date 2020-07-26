function button() {
    let form = document.getElementById("form");
    form.on('submit', function (e) {
        e.preventDefault();
        console.log('click')
    });
}

await button();