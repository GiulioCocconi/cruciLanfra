const DIMENSIONE_CELLA = 40;
const MARGINE_LABELS = DIMENSIONE_CELLA * 0.1

const LABEL_SIZE = 15
const LETTERA_SIZE = 25

const FONT_COLOR = '#00000'
const FAMILY = "Inconsolata"

function display(cruciverba, debug) {
    tabella = setupTabella(cruciverba.larghezza, cruciverba.altezza)
    tabella = setupOrizzontali(tabella, cruciverba.paroleOrizzontali)
    tabella = setupVerticali(tabella, cruciverba.paroleVerticali)

    tavola = drawTavola(cruciverba, tabella)
    drawSoluzioni(tabella, tavola)
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

function drawTavola(cruciverba, tabella) {
    const DIMENSIONE_X = cruciverba.larghezza * DIMENSIONE_CELLA
    const DIMENSIONE_Y = cruciverba.larghezza * DIMENSIONE_CELLA

    var tutteParole = cruciverba.paroleOrizzontali.concat(cruciverba.paroleVerticali)
    tutteParole.sort((a, b) => a.n - b.n) // Ordina le parole a seconda del numero

    cluesOrizzontali(cruciverba.paroleOrizzontali)
    cluesVerticali(cruciverba.paroleVerticali)

    var tavola = SVG().addTo('#cruciverba').size(DIMENSIONE_X, DIMENSIONE_Y)
    tavola.rect(DIMENSIONE_X, DIMENSIONE_Y).fill('#dfdfdf')

    var i = 0
    tabella.forEach((riga, y) => {
        riga.forEach((cella, x) => {
            scriviTestoLabel(tavola, i++, [x, y])
        })
    });

    return tavola
}

function drawSoluzioni(tabella, tavola) {
    tabella.forEach((riga, y) => {
        riga.forEach((cella, x) => {
            if (cella == 0) {
                var rettangolo = tavola.rect(DIMENSIONE_CELLA, DIMENSIONE_CELLA).fill('#000000')
                rettangolo.move(x * DIMENSIONE_CELLA, y * DIMENSIONE_CELLA)
            } else {
                var lettera = cella.toString()
                scriviLettera(tavola, lettera, [x, y])

            }
        })
    })
}


function scriviLettera(tavola, lettera, cella) {
    const x = cella[0] * DIMENSIONE_CELLA
    const y = cella[1] * DIMENSIONE_CELLA

    // Itera tra i caratteri
    var scritto = tavola.text(lettera.toString())
    scritto.move(x, y).font({ size: LETTERA_SIZE, fill: FONT_COLOR, family: FAMILY })

}

function scriviTestoLabel(tavola, testo, cella) {

    
    const x = cella[0] * DIMENSIONE_CELLA + MARGINE_LABELS
    const y = cella[1] * DIMENSIONE_CELLA + MARGINE_LABELS

    var scritto = tavola.text(testo.toString())
    scritto.move(x, y).font({ size: LABEL_SIZE, fill: FONT_COLOR, family: FAMILY })
}

function cluesOrizzontali(parole) {}
function cluesVerticali(parole) {}