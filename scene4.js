// Scène 4 : DOS DU LIVRE

// Phrase finale
const PHRASE = "L'ESSENTIEL EST INVISIBLE POUR LES YEUX"

// Étoiles de fond
let aStars4 = []
let isInit4 = false

// Tableau de lettres
let aLetters4 = []
let lettersInit = false

//Bouton pour revenir à la page de couverture
let resetPageButton4 = null

function setupScene4(plan) {
    // Initialisation des étoiles de fond (comme la scène 0)
    if (!isInit4) {
        const numStars = 150

        for (let i = 0; i < numStars; i++) {
            aStars4.push({
                x: random(plan.width),
                y: random(plan.height),
                rayon: random(2, 2.6),
                vitesseY: random(0.07, 0.35),

                scintillement: random(TWO_PI),
                sSpeed: random(0.01, 0.04),
            })
        }

        isInit4 = true
    }

    // INITIALISATION DES LETTRES
    if (!lettersInit) {
        initLetters(plan)
        lettersInit = true
    }

    // Fond dégradé (cf scène 0)
    for (let y = 0; y < plan.height; y++) {
        let r = map(y, 0, plan.height, 10, 30)
        let g = map(y, 0, plan.height, 15, 30)
        let b = map(y, 0, plan.height, 40, 70)
        plan.stroke(r, g, b)
        plan.line(0, y, plan.width, y)
    }

    // ETOILES DE FOND
    plan.noStroke()
    for (let star of aStars4) {
        star.y += star.vitesseY
        if (star.y > plan.height + 2) {
            star.y = -2
            star.x = random(plan.width)
        }

        star.scintillement += star.sSpeed
        const alpha = 140 + 80 * Math.sin(star.scintillement)

        plan.fill(255, alpha)
        plan.circle(star.x, star.y, star.rayon)
    }

    // Texte qui apparait progressivement avec alpha (un texte par lettre pour gérer l'alpha)
    plan.textSize(18)
    for (let letter of aLetters4) {
        letter.phase += letter.speed

        // valeur de base pour l'apparition
        const alphaBase = 80

        // amplitude du scintillement
        const alphaAmplitude = 80

        // alpha final modulé par une oscillation douce
        //On reprend le principe de la scène 0 pour le scintillement avec Math.sin
        const alpha = (alphaBase + alphaAmplitude * Math.sin(letter.phase)) * 0.01

        //Maximum de 255 pour éviter les erreurs d'alpha
        letter.alpha = min(letter.alpha + alpha, 255)

        plan.fill(255, letter.alpha)
        plan.text(letter.char, letter.x, letter.y)
    }
}

function initLetters(plan) {
    const spacing = 18
    const totalWidth = PHRASE.length * spacing
    const startX = plan.width / 2 - totalWidth / 2
    const y = 100

    //Pour chaque lettre de la phrase, on attribue sa position et un alpha
    for (let i = 0; i < PHRASE.length; i++) {
        aLetters4.push({
            char: PHRASE[i],
            x: startX + i * spacing,
            y: y,

            alpha: 0,
            phase: random(6),
            speed: random(0.01, 0.04),
        })
    }
}

//Le bouton de réinitialisation doit être crée qu'une seule fois
//Il est créé sur le plan principal du sketch (et non sur le plan de la scène courante)
function showScene4ResetButton() {
    const buttonWidth = 190
    if (!resetPageButton4) {
        resetPageButton4 = createButton('Retour à la couverture')
        resetPageButton4.size(buttonWidth, 40)
        //Au clic, on recommence à la page 0
        resetPageButton4.mousePressed(() => {
            currentPage = 0
        })
    }

    const posBtnY = 160
    //On centre le bouton
    resetPageButton4.position(tailleCanva[0] / 2 - buttonWidth / 2 + 10, posBtnY)
    resetPageButton4.show()
}

// Fonction pour cacher le bouton quand on quitte la scène 4
function hideScene4ResetButton() {
    if (resetPageButton4) {
        resetPageButton4.hide()
    }
}

