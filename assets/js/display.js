const DIMENSIONE_CELLA = 40;
const MARGINE_NUMERI = DIMENSIONE_CELLA * 0.1
const MARGINE_CASELLA = MARGINE_NUMERI * 5.5

function display(cruciverba, debug) {
    tabella = setupTabella(cruciverba.larghezza, cruciverba.altezza)
    tabella = setupOrizzontali(tabella, cruciverba.paroleOrizzontali)
    tabella = setupVerticali(tabella, cruciverba.paroleVerticali)
    draw(cruciverba, tabella)
    if (debug) {
        console.log("Larghezza: " + cruciverba.larghezza)
        console.log("Altezza: " + cruciverba.altezza)
        console.log()
        console.log("N. parole orizzontali: " + cruciverba.paroleOrizzontali.length)
        cruciverba.paroleOrizzontali.forEach(parola => {
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
            tabella[parola.y][x] = parola.word.charAt(x);
        }
    })
    return tabella;
}

function setupVerticali(tabella, parole) {
    parole.forEach((parola) => {
        const lunghezza = parola.word.length
        for (let y = parola.y; y < lunghezza + parola.y; y++) {
            tabella[y][parola.x] = parola.word.charAt(y);
        }
    })
    return tabella;
}

function draw(cruciverba, tabella) {
    cluesOrizzontali(cruciverba.paroleOrizzontali)
    cluesVerticali(cruciverba.paroleVerticali)
     
    const DIMENSIONE_X = cruciverba.larghezza * DIMENSIONE_CELLA
    const DIMENSIONE_Y = cruciverba.larghezza * DIMENSIONE_CELLA

    var tavola = SVG().addTo('#cruciverba').size(DIMENSIONE_X, DIMENSIONE_Y)
    tavola.rect(DIMENSIONE_X, DIMENSIONE_Y).fill('#dfdfdf')

    var i = 0
    tabella.forEach((riga, y) => {
        var lineX = tavola.line(0, y * DIMENSIONE_CELLA + MARGINE_CASELLA, DIMENSIONE_X, y * DIMENSIONE_CELLA + MARGINE_CASELLA)
        lineX.stroke({ color: '#f06', width: 1, linecap: 'round' })

        riga.forEach((cella, x) => {
            scriviTesto(tavola, i++, [x, y])
        })
    });

}

function scriviTesto(tavola, testo, cella) {
    const MARGINE_X = DIMENSIONE_CELLA * 0.1
    const MARGINE_Y = DIMENSIONE_CELLA * 0.1
    const SIZE = 15
    const COLOR = '#00000'
    const FAMILY = "Inconsolata"
    
    const x = cella[0] * DIMENSIONE_CELLA + MARGINE_X
    const y = cella[1] * DIMENSIONE_CELLA + MARGINE_Y

    var scritto = tavola.text(testo.toString())
    scritto.move(x, y).font({ size: SIZE, fill: COLOR, family: FAMILY })
}

function cluesOrizzontali(parole) {}
function cluesVerticali(parole) {}