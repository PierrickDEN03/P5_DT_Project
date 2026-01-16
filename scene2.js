// SCÈNE 2 : PAGE 2

// Variables globales
let etoiles2 = []
let meteores2 = []
let isInit2 = false
let scene2MainAsteroid = null
let scene2SmallAsteroids = []
const scene2AsteroidPadding = 40

function setupScene2(plan) {
    // Initialisation au premier appel des étoiles
    if (!isInit2) {
        initEtoiles(plan, etoiles2)
        isInit2 = true
    }

    initScene2Asteroids(plan)
    // Fond du ciel nocturne
    plan.background(8, 10, 18)

    //affichage (cf fichier draw_etoiles)
    dessinerEtoiles(plan, etoiles2)

    //Cf fichier draw_meteores
    dessinerPluieDeMeteores(plan)

    dessinerAsteroide2(plan)

    //Pour les monsieurs
    dessinerAsteroidesFlottants(plan)

    initPrinceScene2(plan)
    assombrissement(plan)
}

function dessinerAsteroide2(plan) {
    const m = getScene2MainAsteroidMetrics(plan)
    dessinerAsteroideComplet(plan, m)
}

function initScene2Asteroids(plan) {
    if (!scene2MainAsteroid) {
        const m = obtenirMetriquesAsteroide(plan, 0.52, 0.57, 0.2, 0.14)
        scene2MainAsteroid = {
            x: m.centreX,
            y: m.centreY,
            rx: m.rayonX,
            ry: m.rayonY,
        }
    }

    if (scene2SmallAsteroids.length === 0) {
        const positions = [
            { x: 0.1, y: 0.2 },
            { x: 0.25, y: 0.15 },
            { x: 0.25, y: 0.3 },
            { x: 0.9, y: 0.2 },
            { x: 0.75, y: 0.15 },
            { x: 0.75, y: 0.3 },
        ]

        scene2SmallAsteroids = positions.map((pos, index) => {
            return {
                x: plan.width * pos.x,
                y: plan.height * pos.y,
                size: plan.width * 0.085,
                index,
            }
        })
    }
}

function getScene2MainAsteroidMetrics(plan) {
    initScene2Asteroids(plan)
    return {
        centreX: scene2MainAsteroid.x,
        centreY: scene2MainAsteroid.y,
        rayonX: scene2MainAsteroid.rx,
        rayonY: scene2MainAsteroid.ry,
    }
}

// Sélectionne un petit astéroïde cliquable pour le drag & drop
function scene2SelectionnerAsteroide(x, y) {
    // S'assurer que les astéroïdes sont bien initialisés
    initScene2Asteroids({ width, height })

    // Parcours des petits astéroïdes pour détecter un clic
    for (let i = 0; i < scene2SmallAsteroids.length; i++) {
        const asteroid = scene2SmallAsteroids[i]
        const demiLargeur = asteroid.size * 1.1
        const demiHauteur = asteroid.size * 0.8
        const decalageX = x - asteroid.x
        const decalageY = y - asteroid.y
        // Test de collision ellipse pour cet astéroïde
        const estTouche = (decalageX * decalageX) / (demiLargeur * demiLargeur) + (decalageY * decalageY) / (demiHauteur * demiHauteur) <= 1

        if (estTouche) {
            return {
                scene: 2,
                typeAsteroide: 'small',
                indice: i,
                decalageX,
                decalageY,
                demiLargeur,
                demiHauteur,
            }
        }
    }

    // On ignore l'astéroïde principal pour le drag & drop (non déplaçable)
    return null
}

// Déplace l'astéroïde sélectionné (les petits uniquement) en respectant les limites du canva
function scene2DeplacerAsteroide(selection, x, y) {
    const minX = scene2AsteroidPadding + selection.demiLargeur
    const maxX = width - scene2AsteroidPadding - selection.demiLargeur
    const minY = scene2AsteroidPadding + selection.demiHauteur
    const maxY = height - scene2AsteroidPadding - selection.demiHauteur

    //Small pour petits astéroides, on avait pensé à le faire pour le grand aussi mais ça ne s'est pas fait
    if (selection.typeAsteroide === 'small') {
        const asteroid = scene2SmallAsteroids[selection.indice]
        // Repositionnement du petit astéroïde avec limites écran
        asteroid.x = constrain(x - selection.decalageX, minX, maxX)
        asteroid.y = constrain(y - selection.decalageY, minY, maxY)
    }
}

function scene2PickAsteroid(x, y) {
    return scene2SelectionnerAsteroide(x, y)
}

function scene2DragAsteroid(selection, x, y) {
    return scene2DeplacerAsteroide(selection, x, y)
}

// Création du petit prince
function initPrinceScene2(plan) {
    const m = getScene2MainAsteroidMetrics(plan)
    const baseX = m.centreX - m.rayonX * 0.35
    const echelle = plan.width * 0.0002
    //Centre dans l'asteroide
    const baseY = m.centreY - m.rayonY * 1
    // Appel de la fonction du fichier drawPrince.js
    dessinerPetitPrince(plan, baseX, baseY, echelle)
}

// Création des 6 astéroides pour les 6 personnes
function dessinerAsteroidesFlottants(plan) {
    initScene2Asteroids(plan)

    for (let i = 0; i < scene2SmallAsteroids.length; i++) {
        const asteroid = scene2SmallAsteroids[i]
        dessinerPetitAsteroide(plan, asteroid.x, asteroid.y, asteroid.size, asteroid.index)
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
