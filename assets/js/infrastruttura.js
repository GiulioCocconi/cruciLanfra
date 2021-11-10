const json_path = "assets/json/"

async function init() {
    // L'url sarà ".../index?numero=dicembre"
    var parameters = new URLSearchParams(window.location.search)

    const numero = parameters.get("numero")
    const file_definizione = checkNumero(numero)

    // Se il file non esiste...
    if (file_definizione == "N/D") {
        alert("Il link seguito è errato!!!!");
        //window.location.replace("https://lanfranconi.edu.it")
    } 
    
    const testo_titolo = "Cruciverba del numero di " + numero; 
    $('#titolo').text(testo_titolo)
    $('#titolo').text("Test")
    console.log("File definizione: " + file_definizione)

    cruciverba = await leggi(file_definizione)
    console.log("Cruciverba: " + cruciverba.larghezza)
    display(cruciverba, true);
    //const C_DEF = $.getJson("assets/json/" + numero + ".json")

}

function checkNumero(numero) {
    if (!numero) return "N/D"
    numero = numero.toString()
    const file = json_path + numero + ".json"
    console.log("File: " + file)
    var res = "";
    var dati = "";
    if (numero === "giveUp") {
        alert(":-)")
        window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    }

    $.ajax({
        async: false,
        url: file,
        type: 'GET',

        error: function() 
        {
            res = "N/D"
        },
        success: function() 
        {
            res = file
        }
    });
    return res
}

function leggi(file_definizione) {

    return fetch(file_definizione)
    .then(res => res.json())
    .then((out) => {
        return out
    })
    .catch(err => { throw err });

}

