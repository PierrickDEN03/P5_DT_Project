// SCÈNE 1 : PAGE 1

//Variables globales
let etoiles1 = []
let meteores1 = []
let isInit1 = false

// Animation de l'avion
let avionAnimating = false
let avionAnimProgress = 0
let avionAnimType = 'none' // 'bouge' ou 'helice'
// Coordonnées de la zone de l'avion [x1, y1, x2, y2]
let aCoordAvion = [0, 0, 0, 0]
let scene1Asteroid = null
const scene1AsteroidPadding = 40

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
    const m = getScene1AsteroidMetrics(plan)
    dessinerAsteroideComplet(plan, m, true)
}

// Dessin du petit prince
function initPrinceScene1(plan) {
    const m = getScene1AsteroidMetrics(plan)
    const baseX = m.centreX - m.rayonX * 0.35
    const echelle = plan.width * 0.00025
    const baseY = m.centreY - m.rayonY * 1

    // Appel de la fonction du fichier drawPrince.js
    dessinerPetitPrince(plan, baseX, baseY, echelle)
}

function initScene1Asteroid(plan) {
    if (scene1Asteroid) {
        return
    }

    const m = obtenirMetriquesAsteroide(plan, 0.52, 0.5, 0.2, 0.14)
    scene1Asteroid = {
        x: m.centreX,
        y: m.centreY,
        rx: m.rayonX,
        ry: m.rayonY,
    }
}

function getScene1AsteroidMetrics(plan) {
    initScene1Asteroid(plan)
    return {
        centreX: scene1Asteroid.x,
        centreY: scene1Asteroid.y,
        rayonX: scene1Asteroid.rx,
        rayonY: scene1Asteroid.ry,
    }
}

function scene1PickAsteroid(x, y) {
    initScene1Asteroid({ width, height })
    const halfW = scene1Asteroid.rx * 1.05
    const halfH = scene1Asteroid.ry * 1.05
    const dx = x - scene1Asteroid.x
    const dy = y - scene1Asteroid.y
    const hit = (dx * dx) / (halfW * halfW) + (dy * dy) / (halfH * halfH) <= 1

    if (!hit) {
        return null
    }

    return {
        scene: 1,
        type: 'main',
        offsetX: dx,
        offsetY: dy,
        halfW,
        halfH,
    }
}

function scene1DragAsteroid(drag, x, y) {
    const minX = scene1AsteroidPadding + drag.halfW
    const maxX = width - scene1AsteroidPadding - drag.halfW
    const minY = scene1AsteroidPadding + drag.halfH
    const maxY = height - scene1AsteroidPadding - drag.halfH

    scene1Asteroid.x = constrain(x - drag.offsetX, minX, maxX)
    scene1Asteroid.y = constrain(y - drag.offsetY, minY, maxY)
}

// Avion du pilote
function dessinerAvion(plan) {
    const posX = plan.width * 0.75
    const posY = plan.height * 0.2
    const echelle = plan.width * 0.00025

    // Définir la zone cliquable de l'avion
    const avionLargeur = 200
    const avionHauteur = 100
    const distSecurite1 = 30 //Marges supplémentaires pour bien qu'on clique sur l'avion
    aCoordAvion[0] = posX - distSecurite1
    aCoordAvion[1] = posY - distSecurite1
    aCoordAvion[2] = posX + avionLargeur + distSecurite1
    aCoordAvion[3] = posY + avionHauteur + distSecurite1

    // Zone cliquable pour l'avion
    //plan.fill(255, 255, 255, 100)
    //plan.noStroke()
    //plan.rect(aCoordAvion[0], aCoordAvion[1], aCoordAvion[2] - aCoordAvion[0], aCoordAvion[3] - aCoordAvion[1])

    // Gestion de l'animation
    if (avionAnimating) {
        avionAnimProgress += 0.02

        if (avionAnimProgress >= 1) {
            //Si l'animation est finit, on change d'animation en redmarrant du debut ou on arrete
            if (avionAnimType === 'bouge') {
                avionAnimType = 'helice'
                avionAnimProgress = 0
            } else if (avionAnimType === 'helice' && avionAnimProgress < 1) {
                // Continue la rotation de l'hélice, rien besoin de faire car on a changé d'animation avant
            } else {
                //Si l'animation de l'helice est terminée
                avionAnimating = false
                avionAnimType = 'none'
                avionAnimProgress = 0
            }
        }
    }

    plan.push()
    plan.translate(posX, posY)

    // Variable d'animation pour gérer la position / rotation
    let translateY = 0
    let rotationHelice = 0

    if (avionAnimType === 'bouge' && avionAnimProgress < 1) {
        // Animation "bouge" : monte / descend 3 fois de 15px
        translateY = sin(avionAnimProgress * PI * 3) * 15
    } else if (avionAnimType === 'helice') {
        // Si animation de l'helice :20 tours de l'helice
        rotationHelice = avionAnimProgress * PI * 20
    }

    //On bouge le plan courant de l'avion en fonction de l'animation
    //Si pas d'animation -> 0 donc bouge pas
    plan.translate(0, translateY)
    plan.scale(echelle)
    plan.rotate(-0.18)

    // Palette de couleurs
    const ROUGE = [235, 55, 65]
    const BLANC = [250]
    const NOIR = [25, 25, 25]
    const VITRE = [150, 215, 240]
    const GRIS = [90, 90, 90]

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

    // Hélice (en fonction de l'animation qui change l'inclinaison)
    plan.push()
    plan.translate(90, 170)
    plan.rotate(rotationHelice)
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

// Détection de clic sur l'avion (à appeler depuis sketch.js dans mousePressed)
function clicAvionScene1(mouseX, mouseY) {
    console.log('click')
    const estDansAvion = mouseX > aCoordAvion[0] && mouseX < aCoordAvion[2] && mouseY > aCoordAvion[1] && mouseY < aCoordAvion[3]
    if (estDansAvion && !avionAnimating) {
        console.log('avion')
        avionAnimating = true
        //Commence par faire bouger l'avion
        avionAnimType = 'bouge'
        avionAnimProgress = 0
        return true
    }

    return false
}

