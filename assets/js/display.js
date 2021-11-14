const DIMENSIONE_CELLA  = 40;

const MARGINE_LABELS    = DIMENSIONE_CELLA  * 0.1
const MARGINE_LETTERE   = MARGINE_LABELS    * 2.8

const LABEL_SIZE        = 15
const LETTERA_SIZE      = 25

const FONT_COLOR        = '#00000'
const FAMILY            = "Inconsolata"

var tavola

var tabellaDisplay
var tabellaSoluzioni
var tabellaDisplay

var paroleCruciverba = []

var rectParole  = []

var inserite    = []

var labels = []

function display(cruciverba, debug) {
    paroleCruciverba     = cruciverba.parole

    tabellaSoluzioni     = setupTabella(cruciverba.larghezza, cruciverba.altezza) // Tabella in cui vengono memorizzate le soluzioni
    tabellaInserita      = setupTabella(cruciverba.larghezza, cruciverba.altezza) // Tabella che memorizza le parole in input
    tabellaDisplay       = setupTabella(cruciverba.larghezza, cruciverba.altezza) // Tabella che contiene i dati testo SVG
    

    cruciverba.parole.forEach((parola) => {
        tabellaSoluzioni = scriviParolaInTabella(tabellaSoluzioni, parola.word, parola.vert, [parola.x, parola.y])
        tabellaInserita  = scriviTabellaVuota(tabellaInserita, parola.word.length, parola.vert, [parola.x, parola.y])

    })
    
    drawTavola()
    setupRectParole()
    scriviTestoLabel()
    displayTabellaInTavola(tabellaSoluzioni)
}

function setupTabella(x, y) {
    // Crea un array 2d di dimensioni X e Y, pieno di 0
    tabella = []
    for (let i = 0; i < y; i++) {
        tabella.push(new Array(x).fill(0))
    }
    return tabella
}

function drawTavola() {
    // Inizializza la tavola
    const DIMENSIONE_X = tabella[0].length * DIMENSIONE_CELLA // Tabella[0].length = larghezza
    const DIMENSIONE_Y = tabella.length    * DIMENSIONE_CELLA // Tabella[1].length = altezza

    tavola = SVG().addTo('#cruciverba')
                  .size(DIMENSIONE_X, DIMENSIONE_Y)

    displayTabellaInTavola(tabellaInserita)
}


function displayTabellaInTavola(tabella) {
    // Rimuove il rect rosso se presente
    rectParole.forEach(rect => {
        rect.attr('fill', '#ffffff')
    })

    tabella.forEach((riga, y) => {
        riga.forEach((cella, x) => {
            if (cella === 0) {
                quadratoNero([x, y])
            } else {
                scriviLetteraInTavola(cella, [x, y])
            }
        })
    })
}

function cercaParola(n, vert) { //OUTPUT: indice in paroleCruciverba
    var trovato = -1
    paroleCruciverba.forEach((parola, numeroParola) => {
        if ((parola.n == n) && (parola.vert == vert)) {
            trovato = numeroParola
        }
    })
    return trovato;
} 

function inversoCercaParola(numeroParola) {
    var parola = paroleCruciverba[numeroParola]
    return [parola.n, parola.vert]
}

function inputParola(parolaDaInserire, n, vert) {
    // La parola da inserire viene scritta tutta maiuscola
    parolaDaInserire = parolaDaInserire.toUpperCase()
    
    numeroParola = cercaParola(n, vert)

    if (numeroParola === -1) {
        console.log("Parola non trovata")
        return -99
    }

    var target = paroleCruciverba[numeroParola]

    // Se il numero di lettere è sbagliato non permette l'inserimento e ritorna -1
    if (parolaDaInserire.length != target.word.length) {
        console.log("Attenzione!!!! numero di lettere richiesto: " + target.word.length)
        return target.word.length
    } 

    inserite[numeroParola] = parolaDaInserire

    //inseriscila nella tabella, che verrà mostrata a schermo
    tabellaInserita = scriviParolaInTabella(tabellaInserita, parolaDaInserire, target.vert, [target.x, target.y])
    displayTabellaInTavola(tabellaInserita)

}

function scriviTabellaVuota(tabella, lunghezza, vert, pos) {
    if (vert) {
        // Se la parola è verticale la X rimane costante (pos[0]), la Y parte da pos[1] fino a
        // pos[1] + lunghezza della parola
        for (let y = pos[1]; y < lunghezza + pos[1]; y++) {
            tabella[y][pos[0]] = ""
        } 
    } else {
        // Se la parola è verticale la X rimane costante (pos[0]), la Y parte da pos[1] fino a
        // pos[1] + lunghezza della parola
        for (let x = pos[0]; x < lunghezza + pos[0]; x++) {
            tabella[pos[1]][x] = ""
        }
    }
    return tabella
}

function scriviParolaInTabella(tabella, word, vert, pos) {
    // V. commenti su funzione scriviTabellaVuota
    const LUNGHEZZA = word.length
    var i = 0
    if (vert) {
        for (let y = pos[1]; y < LUNGHEZZA + pos[1]; y++) {
            tabella[y][pos[0]] = word.charAt(i)
            i++
        } 
    } else {
        for (let x = pos[0], i = 0; x < LUNGHEZZA + pos[0]; x++) {
            tabella[pos[1]][x] = word.charAt(i)
            i++
        }
    }
    return tabella
}

function quadratoNero(pos) {
    const x = pos[0] * DIMENSIONE_CELLA
    const y = pos[1] * DIMENSIONE_CELLA

    tavola.rect(DIMENSIONE_CELLA, DIMENSIONE_CELLA)
          .fill('#000000')
          .move(x, y)
}

function scriviLetteraInTavola(lettera, pos) {
    const x = pos[0] * DIMENSIONE_CELLA + MARGINE_LETTERE
    const y = pos[1] * DIMENSIONE_CELLA + MARGINE_LETTERE

    // Se la cella è già occupata puliscila...
    if (tabellaDisplay[pos[1]][pos[0]]) {
        tabellaDisplay[pos[1]][pos[0]].clear()
    }
    // Scrivi la lettera sulla cella
    tabellaDisplay[pos[1]][pos[0]] = tavola.text(lettera.toString())
                                           .move(x, y)
                                           .font({ size: LETTERA_SIZE, fill: FONT_COLOR, family: FAMILY })
                                           .front()


}


function sbagliata(n, vert) {
    numeroParola = cercaParola(n, vert)
    if (numeroParola === -1) { return -99}
    rectParole[numeroParola].attr('fill', '#ff0000')

}

function aiuto() {
    inserite.forEach((parolaInserita, numeroParola) => {
        var target = paroleCruciverba[numeroParola].word
        if (parolaInserita != target) {
                parola = inversoCercaParola(numeroParola)
                sbagliata(parola[0], parola[1])
        }
    }) 
}

function soluzioni() {
    displayTabellaInTavola(tabellaSoluzioni)
}

function setupRectParole() {
    rectParole = new Array(paroleCruciverba.length).fill(0)

    // Conterrà le parole inserite
    inserite = new Array(paroleCruciverba.length).fill(0)

    paroleCruciverba.forEach((parola, numeroParola) => {
        const x     = parola.x * DIMENSIONE_CELLA
        const y     = parola.y * DIMENSIONE_CELLA
        
        var dx      = 0
        var dy      = 0
    
        if (parola.vert) {
            dx = DIMENSIONE_CELLA
            dy = DIMENSIONE_CELLA * parola.word.length
        } else {
            dy = DIMENSIONE_CELLA
            dx = DIMENSIONE_CELLA * parola.word.length
        }
    
        rectParole[numeroParola] = tavola.rect(dx, dy)
                                         .move(x, y)
                                         .back()
    
    })
}

function scriviTestoLabel() {
    paroleCruciverba.forEach(parola => {
        const numeroParola = parola.n
        if (!labels.includes(numeroParola)) {
      
            const x            = parola.x * DIMENSIONE_CELLA + MARGINE_LABELS
            const y            = parola.y * DIMENSIONE_CELLA + MARGINE_LABELS
    
            tavola.text((numeroParola).toString())
                  .move(x, y)
                  .font({ size: LABEL_SIZE, fill: FONT_COLOR, family: FAMILY })
                  .front()
        
            labels.push(numeroParola)
        }
    })
}