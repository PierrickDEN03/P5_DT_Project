// SCÈNE 1 : PAGE 1

//Variables globales
let etoiles1 = []
let meteores1 = []
const MAX_METEORES = 80
let isInit1 = false

// Fonction principale
function setupScene1(plan) {
    // Initialisation au premier appel des étoiles
    if (!isInit1) {
        initEtoiles(plan, etoiles1)
        isInit1 = true
    }

    // Fond du ciel nocturne
    plan.background(8, 10, 18)

    // Dessiner tous les élément

    // affichage des étoiles (cf fichier draw_etoiles)
    dessinerEtoiles(plan, etoiles1)

    //Cf fichier draw_meteores
    dessinerPluieDeMeteores(plan)
    dessinerAsteroide(plan)

    //Fonction utilitaire initialisant le petit prince selon le fichier drawPrince.js
    initPrinceScene1(plan)
    dessinerAvion(plan)
    assombrissement(plan)
}

function dessinerAsteroide(plan) {
    const m = obtenirMetriquesAsteroide(plan, 0.52, 0.5, 0.2, 0.14)
    dessinerAsteroideComplet(plan, m, true)
}

// Dessin du petit prince
function initPrinceScene1(plan) {
    const m = obtenirMetriquesAsteroide(plan)
    const baseX = m.centreX - m.rayonX * 0.35
    const echelle = plan.width * 0.00025
    const baseY = m.centreY - m.rayonY * 3

    // Appel de la fonction du fichier drawPrince.js
    dessinerPetitPrince(plan, baseX, baseY, echelle)
}

// Avion du pilote
function dessinerAvion(plan) {
    const posX = plan.width * 0.75
    const posY = plan.height * 0.2
    const echelle = plan.width * 0.00025

    plan.push()
    plan.translate(posX, posY)
    plan.scale(echelle)
    plan.rotate(-0.18)

    // Palette de couleurs
    const ROUGE = [235, 55, 65]
    const BLANC = [250]
    const NOIR = [25]
    const VITRE = [150, 215, 240]
    const GRIS = [90]

    // Configuration du trait
    plan.stroke(...NOIR)
    plan.strokeWeight(5)
    plan.strokeJoin(ROUND)
    plan.strokeCap(ROUND)

    // Corps principal blanc
    plan.fill(...BLANC)
    plan.rect(120, 0, 560, 70, 40)

    // Bandeau rouge du milieu
    plan.fill(...ROUGE)
    plan.rect(210, 210, 380, 55, 30)

    // Grande section rouge centrale
    plan.fill(...ROUGE)
    plan.rect(150, 90, 600, 160, 80)

    // Nez de l'avion (noir)
    plan.fill(...NOIR)
    plan.rect(90, 115, 110, 110, 55)

    // Hélice
    plan.push()
    plan.translate(90, 170)
    plan.fill(...GRIS)
    plan.ellipse(0, 0, 20, 20)
    plan.rect(-150, -7, 140, 14, 7)
    plan.rect(10, -7, 140, 14, 7)
    plan.pop()

    // Pare-brise
    plan.fill(...VITRE)
    plan.rect(250, 105, 140, 70, 20)

    // Hublots ronds
    plan.fill(...BLANC)
    plan.ellipse(430, 170, 26, 26)
    plan.ellipse(470, 170, 26, 26)
    plan.ellipse(510, 170, 26, 26)

    // Queue de l'avion (rouge)
    plan.fill(...ROUGE)
    plan.rect(645, 175, 170, 40, 20)

    // Aileron vertical
    plan.beginShape()
    plan.vertex(705, 70)
    plan.vertex(815, 110)
    plan.vertex(800, 235)
    plan.vertex(690, 235)
    plan.endShape(CLOSE)

    // Train d'atterrissage
    plan.strokeWeight(5)
    plan.line(285, 250, 260, 320)
    plan.line(330, 250, 305, 320)

    // Roues
    plan.fill(...NOIR)
    plan.ellipse(260, 345, 60, 60)
    plan.ellipse(305, 345, 60, 60)

    // Centre des roues
    plan.fill(...GRIS)
    plan.ellipse(260, 345, 20, 20)
    plan.ellipse(305, 345, 20, 20)

    plan.pop()
}

// Effet assombri
function assombrissement(plan) {
    plan.noStroke()
    plan.fill(0, 0, 0, 120)
    plan.rect(0, 0, plan.width, plan.height)
}
