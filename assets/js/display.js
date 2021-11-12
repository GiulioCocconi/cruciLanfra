const DIMENSIONE_CELLA  = 40;

const MARGINE_LABELS    = DIMENSIONE_CELLA  * 0.1
const MARGINE_LETTERE   = MARGINE_LABELS    * 2.8

const LABEL_SIZE        = 15
const LETTERA_SIZE      = 25

const FONT_COLOR        = '#00000'
const FAMILY            = "Inconsolata"

var tabellaDisplay;

function display(cruciverba, debug) {
    tabellaSoluzioni     = setupTabella(cruciverba.larghezza, cruciverba.altezza)
    tabellaInserita      = setupTabella(cruciverba.larghezza, cruciverba.altezza)
    tabellaDisplay       = setupTabella(cruciverba.larghezza, cruciverba.altezza)
    
    cruciverba.parole.forEach((parola) => {
        console.log(parola.word)
        tabellaSoluzioni = scriviParolaInTabella(tabellaSoluzioni, parola.word, parola.vert, [parola.x, parola.y])
        tabellaInserita  = scriviTabellaVuota(tabellaInserita, parola.word.length, parola.vert, [parola.x, parola.y])

    })
    
    tavola = drawTavola(tabellaInserita)

    scriviTestoLabel(tavola, cruciverba.parole)

    displayTabellaInTavola(tavola, tabellaSoluzioni)
    if (debug) {
        console.log("Larghezza: " + cruciverba.larghezza)
        console.log("Altezza: " + cruciverba.altezza)
        console.log()
        console.log()

    }
}

function setupTabella(x, y) {
    tabella = []
    for (let i = 0; i < y; i++) {
        tabella.push(new Array(x).fill(0))
    }
    return tabella
}

function drawTavola(tabella) {
    const DIMENSIONE_X = tabella[0].length * DIMENSIONE_CELLA
    const DIMENSIONE_Y = tabella.length    * DIMENSIONE_CELLA

    var tavola = SVG().addTo('#cruciverba').size(DIMENSIONE_X, DIMENSIONE_Y)
    tavola.rect(DIMENSIONE_X, DIMENSIONE_Y).fill('#dfdfdf')

    displayTabellaInTavola(tavola, tabella)
    return tavola
}


function displayTabellaInTavola(tavola, tabella) {
    tabella.forEach((riga, y) => {
        riga.forEach((cella, x) => {
            if (cella === 0) {
                quadratoNero(tavola, [x, y]);
            } else {
                scriviLettera(tavola, cella, [x, y])
            }
        })
    })
}

function inputParola(tavola, tabella, parolaDaInserire, numeroParola, paroleCruciverba) {
    parolaDaInserire = parolaDaInserire.toUpperCase()
    var target = paroleCruciverba[numeroParola]

    if (parolaDaInserire.length != target.word.length) {
        console.log("Attenzione!!!! numero di lettere richiesto: " + target.word.length)
        return
    } 

    tabella = scriviParolaInTabella(tabella, parolaDaInserire, target.vert, [target.x, target.y])
    displayTabellaInTavola(tavola, tabella)

    return 

}

function scriviTabellaVuota(tabella, lunghezza, vert, pos) {
    if (vert) {
        for (let y = pos[1]; y < lunghezza + pos[1]; y++) {
            tabella[y][pos[0]] = "";
        } 
    } else {
        for (let x = pos[0]; x < lunghezza + pos[0]; x++) {
            tabella[pos[1]][x] = "";
        }
    }
    return tabella
}

function scriviParolaInTabella(tabella, word, vert, pos) {
    const LUNGHEZZA = word.length
    var i = 0;
    console.log(word)
    if (vert) {
        for (let y = pos[1]; y < LUNGHEZZA + pos[1]; y++) {
            tabella[y][pos[0]] = word.charAt(i);
            i++;
        } 
    } else {
        for (let x = pos[0], i = 0; x < LUNGHEZZA + pos[0]; x++) {
            tabella[pos[1]][x] = word.charAt(i);
            i++;
        }
    }
    return tabella
}

function quadratoNero(tavola, pos) {
    var rettangolo = tavola.rect(DIMENSIONE_CELLA, DIMENSIONE_CELLA).fill('#000000')
    rettangolo.move(pos[0] * DIMENSIONE_CELLA, pos[1] * DIMENSIONE_CELLA)
}

function scriviLettera(tavola, lettera, pos) {
    const x = pos[0] * DIMENSIONE_CELLA + MARGINE_LETTERE
    const y = pos[1] * DIMENSIONE_CELLA + MARGINE_LETTERE
    console.log(x)
    console.log(y)
    console.log(lettera.toString())


    if (tabellaDisplay[pos[1]][pos[0]]) {
        tabellaDisplay[pos[1]][pos[0]].clear()
    }
    tabellaDisplay[pos[1]][pos[0]] = tavola.text(lettera.toString())
    tabellaDisplay[pos[1]][pos[0]].move(x, y).font({ size: LETTERA_SIZE, fill: FONT_COLOR, family: FAMILY })


}


function scriviTestoLabel(tavola, parole) {
    parole.forEach((parola, n) => {
        const x = parola.x * DIMENSIONE_CELLA + MARGINE_LABELS
        const y = parola.y * DIMENSIONE_CELLA + MARGINE_LABELS
    
        var scritto = tavola.text((n+1).toString())
        scritto.move(x, y).font({ size: LABEL_SIZE, fill: FONT_COLOR, family: FAMILY })
    })
}