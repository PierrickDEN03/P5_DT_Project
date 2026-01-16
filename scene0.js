//Scene 0 : Couverture de livre
//PS : Dans le script des scènes, les variables portent des numéros indiquant le numéro de scène
// (Pour éviter le cas de la redéclaration de variable)

//Tableau d'étoiles
let aStars0 = []
let isInit0 = false

function setupScene0(plan) {
    // On initialise les étoiles une seule fois (positions, vitesses, scintillement)
    if (!isInit0) {
        const numStars = 150
        for (let i = 0; i < numStars; i++) {
            aStars0.push({
                x: random(plan.width),
                y: random(plan.height),
                rayon: random(2, 2.6),
                vitesseY: random(0.35, 0.07), // vitesse verticale (descente lente)
                // phase de scintillement -> initialise à un scintillement aléatoire
                scintillement: random(8),
                sSpeed: random(0.04 + 0.01),
            })
        }
        isInit0 = true
    }

    // Dégradé du ciel (bleu foncé vers violet) basé sur la taille du plan
    for (let y = 0; y < plan.height; y++) {
        let r = map(y, 0, plan.height, 20, 50)
        let g = map(y, 0, plan.height, 30, 40)
        let b = map(y, 0, plan.height, 60, 80)
        plan.stroke(r, g, b)
        plan.line(0, y, plan.width, y)
    }

    // Lune en haut à gauche
    let moonX = 80
    let moonY = 80
    let moonRadius = 50

    plan.noStroke()
    plan.fill(220, 220, 180)
    plan.circle(moonX, moonY, moonRadius * 2)

    // Cratères (ellipses noires superposées)
    plan.fill(40, 40, 40)
    plan.ellipse(moonX - 15, moonY - 15, 15, 15)
    plan.ellipse(moonX + 10, moonY - 5, 12, 12)
    plan.ellipse(moonX - 5, moonY + 20, 10, 10)
    plan.ellipse(moonX + 20, moonY + 10, 8, 8)

    // Étoiles animées (descente lente + scintillement)
    plan.noStroke()
    for (let star of aStars0) {
        // Mise à jour de la position
        star.y += star.vitesseY
        if (star.y > plan.height + 2) {
            star.y = -2
            star.x = random(plan.width)
        }

        // Scintillement avec la valeur alpha
        star.scintillement += star.sSpeed
        //En utilisant sin, on a une valeur entre 0 et -1 et continue
        //Evite l'effet de clignotement à l'écran (160 par défaut pour éviter que ce soit invisible)
        const alpha = 160 + 95 * Math.sin(star.scintillement)
        plan.fill(255, 255, 255, alpha)
        plan.circle(star.x, star.y, star.rayon)
    }

    dessinerCouvertureScene0(plan)
}

function dessinerCouvertureScene0(plan) {
    if (!imageCouverture) {
        return
    }

    const imgW = plan.width * 0.28
    const imgH = imgW * (imageCouverture.height / imageCouverture.width)
    const imgX = plan.width * 0.5
    const imgY = plan.height * 0.62

    plan.push()
    plan.imageMode(CENTER)
    plan.image(imageCouverture, imgX, imgY, imgW, imgH)
    plan.pop()
}
