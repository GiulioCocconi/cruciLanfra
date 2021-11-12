const DIMENSIONE_CELLA  = 40;

const MARGINE_LABELS    = DIMENSIONE_CELLA  * 0.1
const MARGINE_LETTERE   = MARGINE_LABELS    * 2.8

const LABEL_SIZE        = 15
const LETTERA_SIZE      = 25

const FONT_COLOR        = '#00000'
const FAMILY            = "Inconsolata"

var tabellaDisplay;
var tabellaSoluzioni;
var tabellaDisplay;

function display(cruciverba, debug) {
    tabellaSoluzioni     = setupTabella(cruciverba.larghezza, cruciverba.altezza) // Tabella in cui vengono memorizzate le soluzioni
    tabellaInserita      = setupTabella(cruciverba.larghezza, cruciverba.altezza) // Tabella che memorizza le parole in input
    tabellaDisplay       = setupTabella(cruciverba.larghezza, cruciverba.altezza) // Tabella che contiene i dati testo SVG
    

    cruciverba.parole.forEach((parola) => {
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
    // Crea un array 2d di dimensioni X e Y, pieno di 0
    tabella = []
    for (let i = 0; i < y; i++) {
        tabella.push(new Array(x).fill(0))
    }
    return tabella
}

function drawTavola(tabella) {
    // Inizializza la tavola
    const DIMENSIONE_X = tabella[0].length * DIMENSIONE_CELLA // Tabella[0].length = larghezza
    const DIMENSIONE_Y = tabella.length    * DIMENSIONE_CELLA // Tabella[1].length = altezza

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
                scriviLetteraInTavola(tavola, cella, [x, y])
            }
        })
    })
}

function inputParola(tavola, parolaDaInserire, numeroParola, paroleCruciverba) {
    // La parola da inserire viene scritta tutta maiuscola
    parolaDaInserire = parolaDaInserire.toUpperCase()

    // Se è giusta, essa è uguale al target
    var target = paroleCruciverba[numeroParola]

    // Se il numero di lettere è sbagliato non permette l'inserimento e ritorna -1
    if (parolaDaInserire.length != target.word.length) {
        console.log("Attenzione!!!! numero di lettere richiesto: " + target.word.length)
        return -1
    } 
    // Se la parola ha la lunghezza giusta, inseriscila nella tabella, che verrà mostrata a schermo
    tabellaInserita = scriviParolaInTabella(tabellaInserita, parolaDaInserire, target.vert, [target.x, target.y])
    displayTabellaInTavola(tavola, tabellaInserita)

}

function scriviTabellaVuota(tabella, lunghezza, vert, pos) {
    if (vert) {
        // Se la parola è verticale la X rimane costante (pos[0]), la Y parte da pos[1] fino a
        // pos[1] + lunghezza della parola
        for (let y = pos[1]; y < lunghezza + pos[1]; y++) {
            tabella[y][pos[0]] = "";
        } 
    } else {
        // Se la parola è verticale la X rimane costante (pos[0]), la Y parte da pos[1] fino a
        // pos[1] + lunghezza della parola
        for (let x = pos[0]; x < lunghezza + pos[0]; x++) {
            tabella[pos[1]][x] = "";
        }
    }
    return tabella
}

function scriviParolaInTabella(tabella, word, vert, pos) {
    // V. commenti su funzione scriviTabellaVuota
    const LUNGHEZZA = word.length
    var i = 0;
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

function scriviLetteraInTavola(tavola, lettera, pos) {
    const x = pos[0] * DIMENSIONE_CELLA + MARGINE_LETTERE
    const y = pos[1] * DIMENSIONE_CELLA + MARGINE_LETTERE

    // Se la cella è già occupata puliscila...
    if (tabellaDisplay[pos[1]][pos[0]]) {
        tabellaDisplay[pos[1]][pos[0]].clear()
    }
    // Scrivi la lettera sulla cella
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