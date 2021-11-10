function display(cruciverba, debug) {
    tabella = setupTabella(cruciverba.larghezza, cruciverba.altezza)
    tabella = setupOrizzontali(tabella, cruciverba.paroleOrizzontali)
    tabella = setupVerticali(tabella, cruciverba.paroleVerticali)
    if (debug) {
        console.log("Larghezza: " + cruciverba.larghezza)
        console.log("Altezza: " + cruciverba.altezza)
        console.log()
        console.log("N. parole orizzontali: " + cruciverba.paroleOrizzontali.length)
        cruciverba.paroleOrizzontali.forEach(parola => {
            console.log(`${parola.n}) ${parola.clue}`)
        });
        console.log()
        console.log("N. parole verticali: " + cruciverba.paroleVerticali.length)
        cruciverba.paroleVerticali.forEach(parola => {
            console.log(`${parola.n}) ${parola.clue}`)
        });
        console.log()
        console.log(tabella)

    }

}

function setupTabella(x, y) {
    tabella = []
    for (let i = 0; i < y; i++) {
        tabella.push(new Array(x).fill(0))      
    }
    return tabella
}

function setupOrizzontali(tabella, parole) {
    parole.forEach((parola) => {
        const lunghezza = parola.word.length
        for (let x = parola.x; x < lunghezza + parola.x; x++) {
            tabella[x][parola.y] = parola[x];
        }
    })
    return tabella;
}

function setupVerticali(tabella, parole) {
    parole.forEach((parola) => {
        const lunghezza = parola.word.length
        for (let y = parola.y; y < lunghezza + parola.y; y++) {
            tabella[parola.x][y] = parola[y];
        }
    })
    return tabella;
}