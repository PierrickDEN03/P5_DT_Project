// SCÈNE 2 : PAGE 2

// Variables globales
let etoiles2 = []
let meteores2 = []
let isInit2 = false

function setupScene2(plan) {
    // Initialisation au premier appel des étoiles
    if (!isInit2) {
        initEtoiles(plan, etoiles2)
        isInit2 = true
    }
    // Fond du ciel nocturne
    plan.background(8, 10, 18)

    //affichage (cf fichier draw_etoiles)
    dessinerEtoiles(plan, etoiles2)

    //Cf fichier draw_meteores
    dessinerPluieDeMeteores(plan)

    dessinerAsteroide2(plan)

    //Pour les monsieurs
    dessinerAsteroïdesFlottants(plan)

    initPrinceScene2(plan)
    assombrissement(plan)
}

function dessinerAsteroide2(plan) {
    const m = obtenirMetriquesAsteroide(plan, 0.52, 0.57, 0.2, 0.14)
    dessinerAsteroideComplet(plan, m)
}

// Création du petit prince
function initPrinceScene2(plan) {
    const m = obtenirMetriquesAsteroide(plan)
    const baseX = m.centreX - m.rayonX * 0.35
    const echelle = plan.width * 0.0002
    //Centre dans l'asteroide
    const baseY = m.centreY - m.rayonY * 2
    // Appel de la fonction du fichier drawPrince.js
    dessinerPetitPrince(plan, baseX, baseY, echelle)
}

// Création des 6 astéroides pour les 6 personnes
function dessinerAsteroïdesFlottants(plan) {
    // Positions des 6 petits astéroïdes
    const positions = [
        { x: 0.1, y: 0.2 },
        { x: 0.25, y: 0.15 },
        { x: 0.25, y: 0.3 },
        { x: 0.9, y: 0.2 },
        { x: 0.75, y: 0.15 },
        { x: 0.75, y: 0.3 },
    ]

    for (let i = 0; i < positions.length; i++) {
        const pos = positions[i]
        dessinerPetitAsteroide(plan, plan.width * pos.x, plan.height * pos.y, plan.width * 0.085, i)
    }
}

function dessinerPetitAsteroide(plan, x, y, taille, index) {
    // Corps de l'astéroïde
    plan.noStroke()
    plan.fill(120, 118, 135)
    plan.ellipse(x, y, taille * 2.2, taille * 1.6)

    // Reflet
    plan.fill(105, 105, 122, 180)
    plan.ellipse(x + taille * 0.2, y + taille * 0.1, taille * 1.6, taille * 1.2)

    // Personnage sur l'astéroïde
    dessinerPersonnage(plan, x, y - taille * 0.25, taille * 0.5, index)
}

function dessinerPersonnage(plan, x, y, echelle, type) {
    plan.push()
    plan.translate(x, y)

    const temps = frameCount * 0.03

    plan.stroke(50, 45, 60, 200)
    plan.strokeWeight(2)

    // Géographe avec compas
    if (type === 0) {
        // Corps
        plan.fill(70, 70, 90)
        plan.rect(-echelle * 0.5, 0, echelle, echelle * 0.9, 6)

        // Tête
        plan.fill(240, 210, 170)
        plan.ellipse(0, -echelle * 0.45, echelle * 0.6, echelle * 0.6)

        // Chapeau
        plan.fill(200, 160, 60)
        plan.triangle(-echelle * 0.3, -echelle * 0.75, 0, -echelle * 1.05, echelle * 0.3, -echelle * 0.75)

        // Étoiles qui brillent autour (compas)
        plan.stroke(240, 210, 160, 180)
        for (let i = 0; i < 6; i++) {
            const posX = echelle * 0.7 + cos(temps + i) * echelle * 0.2
            const posY = -echelle * 0.4 + sin(temps + i * 1.2) * echelle * 0.2
            plan.point(posX, posY)
        }
    }
    // Vaniteux avec couronne
    else if (type === 1) {
        // Corps
        plan.fill(80, 80, 100)
        plan.rect(-echelle * 0.5, 0, echelle, echelle * 0.9, 6)

        // Tête
        plan.fill(240, 210, 170)
        plan.ellipse(0, -echelle * 0.45, echelle * 0.6, echelle * 0.6)

        // Couronne animée
        plan.noStroke()
        plan.fill(255, 240, 200, 90 + 60 * sin(temps))
        plan.triangle(-echelle * 0.5, -echelle * 0.9, 0, -echelle * 1.8, echelle * 0.5, -echelle * 0.9)

        // Applaudissements
        plan.stroke(240, 200, 160, 180)
        plan.strokeWeight(2)
        for (let i = 0; i < 5; i++) {
            plan.point(echelle * 0.7 + i * 4, -echelle * 0.1 + sin(temps + i) * 3)
        }
    }
    //Buveur avec bouteille
    else if (type === 2) {
        // Corps
        plan.fill(70, 70, 90)
        plan.rect(-echelle * 0.5, 0, echelle, echelle * 0.9, 6)

        // Tête
        plan.fill(240, 210, 170)
        plan.ellipse(0, -echelle * 0.45, echelle * 0.6, echelle * 0.6)

        // Bouteille qui oscille
        plan.noStroke()
        const bouteilleX = echelle * 0.5 + sin(temps * 1.6) * echelle * 0.15
        const bouteilleY = echelle * 0.15 + cos(temps * 1.2) * echelle * 0.08
        plan.fill(60, 120, 90)
        plan.rect(bouteilleX, bouteilleY, echelle * 0.18, echelle * 0.38, 4)
        plan.fill(70, 150, 120)
        plan.rect(bouteilleX + echelle * 0.05, bouteilleY - echelle * 0.1, echelle * 0.08, echelle * 0.12, 3)
    }
    // Businessman avec chiffres
    else if (type === 3) {
        // Corps
        plan.fill(60, 60, 80)
        plan.rect(-echelle * 0.5, 0, echelle, echelle * 0.9, 6)

        // Tête
        plan.fill(240, 210, 170)
        plan.ellipse(0, -echelle * 0.45, echelle * 0.6, echelle * 0.6)

        // Étoiles comptées
        plan.stroke(230, 210, 150, 200)
        plan.strokeWeight(2)
        for (let i = 0; i < 5; i++) {
            plan.point(echelle * 0.7 + i * 5, -echelle * 0.2 - i * 3)
        }

        // Chiffres
        plan.noStroke()
        plan.fill(230, 220, 200, 200)
        plan.textSize(echelle * 0.5)
        plan.textAlign(LEFT, CENTER)
        plan.text('127', echelle * 0.2, echelle * 0.05 + sin(temps) * 3)
    }
    // Allumeur avec lampadaire
    else if (type === 4) {
        // Corps
        plan.fill(70, 70, 90)
        plan.rect(-echelle * 0.5, 0, echelle, echelle * 0.9, 6)

        // Tête
        plan.fill(240, 210, 170)
        plan.ellipse(0, -echelle * 0.45, echelle * 0.6, echelle * 0.6)

        // Lampadaire qui clignote
        const lampeAllumee = sin(temps * 3.2) > 0
        plan.stroke(80, 70, 60, 200)
        plan.line(echelle * 0.4, echelle * 0.1, echelle * 0.4, -echelle * 0.2)
        plan.noStroke()
        plan.fill(120, 100, 80)
        plan.rect(echelle * 0.34, -echelle * 0.3, echelle * 0.12, echelle * 0.18, 4)

        if (lampeAllumee) {
            plan.fill(255, 220, 140, 180)
            plan.ellipse(echelle * 0.4, -echelle * 0.4, echelle * 0.4, echelle * 0.4)
        }
    }
    //Personnage avec télescope
    else {
        // Corps
        plan.fill(60, 60, 80)
        plan.rect(-echelle * 0.5, 0, echelle, echelle * 0.9, 6)

        // Tête
        plan.fill(240, 210, 170)
        plan.ellipse(0, -echelle * 0.45, echelle * 0.6, echelle * 0.6)

        // Télescope
        plan.noStroke()
        plan.fill(120, 90, 70)
        plan.rect(-echelle * 0.75, echelle * 0.1, echelle * 1.5, echelle * 0.5, 6)
        plan.fill(160, 120, 90)
        plan.rect(-echelle * 0.7, echelle * 0.16, echelle * 1.4, echelle * 0.38, 6)

        // Détails du télescope
        plan.stroke(90, 70, 50, 160)
        plan.line(-echelle * 0.6, echelle * 0.2, echelle * 0.6, echelle * 0.2)
    }

    plan.pop()
}

// Effet assombri
function assombrissement(plan) {
    plan.noStroke()
    plan.fill(0, 0, 0, 120)
    plan.rect(0, 0, plan.width, plan.height)
}
