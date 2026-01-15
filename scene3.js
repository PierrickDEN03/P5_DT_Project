// SCÈNE 3 : PAGE 3
//Par simplicité, le renard, l'avion et le serpent sont dessinés avec des valeurs absolus (et peut etre redimensionné si jamais)

// État de la scène
let etoiles3 = []
let isInit3 = false
let hauteur, largeur

// Animation du serpent
let aCoordSerpent = [0, 0, 0, 0]
let serpentAnimating = false
let serpentAnimProgress = 0

// Animation du renard
let aCoordRenard = [0, 0, 0, 0]
let renardAnimating = false
let renardAnimProgress = 0
let renardAnimType = 'none' // type d'animation :'queue' ou 'sautille'

// Paramètres du désert (multiplicateur largeur et hauteur )
const aDesert = {
    largeur: 1.2,
    hauteur: 1.2,
}

// Fonction principale
function setupScene3(plan) {
    hauteur = plan.height
    largeur = plan.width
    // Initialisation au premier appel des étoiles
    if (!isInit3) {
        initEtoiles(plan, etoiles3)
        isInit3 = true
    }

    // Dessiner tous les éléments
    dessinerDegradeCrepuscule(plan)
    //affichage (cf fichier draw_etoiles)
    dessinerEtoiles(plan, etoiles3)

    dessinerDesert(plan)
    initPrinceScene3(plan)

    dessinerRenard(plan, largeur * 0.37, hauteur * 0.48, largeur * 0.0006)
    dessinerSerpent(plan, largeur * 0.8, hauteur * 0.73, largeur * 0.0007)
    dessinerAvionAccidente(plan, largeur * 0.22, hauteur * 0.55, largeur * 0.0007)
}

// Dégradé du crépuscule (du bleu nuit vers l'orange)
function dessinerDegradeCrepuscule(plan) {
    //24 nuances de couleur
    const etapes = 24

    for (let i = 0; i <= etapes; i++) {
        // Interpolation entre bleu nuit et orange crépuscule
        const couleurHaut = [36, 40, 78]
        const couleurBas = [232, 186, 170]
        const r = map(i, 0, etapes, couleurHaut[0], couleurBas[0])
        const g = map(i, 0, etapes, couleurHaut[1], couleurBas[1])
        const b = map(i, 0, etapes, couleurHaut[2], couleurBas[2])

        plan.noStroke()
        plan.fill(r, g, b)
        plan.rect(0, hauteur * (i / etapes), largeur, hauteur / etapes + 1)
    }
}

// Désert de sable avec dunes
function dessinerDesert(plan) {
    plan.noStroke()

    // Calcul des dimensions du désert
    const largeurDesert = largeur * aDesert.largeur
    const hauteurDesert = hauteur * aDesert.hauteur

    // Dune principale (grande)
    plan.fill(214, 168, 142)
    plan.ellipse(largeur * 0.5, hauteur * 1.05, largeurDesert, hauteurDesert)

    // Dune secondaire (moyenne, plus claire)
    plan.fill(230, 186, 160, 160)
    plan.ellipse(largeur * 0.58, hauteur * 0.95, largeurDesert * 0.75, hauteurDesert * 0.67)

    // Petite dune (plus sombre)
    plan.fill(200, 150, 130, 140)
    plan.ellipse(largeur * 0.32, hauteur * 0.98, largeurDesert * 0.58, hauteurDesert * 0.56)

    // Lignes de vent sur le sable
    plan.stroke(190, 140, 120, 120)
    plan.strokeWeight(2)
    for (let i = 0; i < 10; i++) {
        const x = largeur * 0.25 + i * largeur * 0.06
        const y = hauteur * 0.78 + sin(i * 0.9) * hauteur * 0.02
        plan.line(x, y, x + largeur * 0.04, y + hauteur * 0.015)
    }
    plan.noStroke()
}

// Petit prince sur la dune
function initPrinceScene3(plan) {
    const baseX = largeur * 0.5
    const echelle = largeur * 0.00065
    const baseY = hauteur * 0.5

    // Appel de la fonction du fichier drawPrince.js
    dessinerPetitPrince(plan, baseX, baseY, echelle)
}

// Renard assis
function dessinerRenard(plan, x, y, echelle) {
    // Définir la zone cliquable du renard
    const renardLargeur = 140 * echelle
    const renardHauteur = 120 * echelle
    const distSecurite = 20
    aCoordRenard[0] = x - renardLargeur / 2 - distSecurite
    aCoordRenard[1] = y - renardHauteur - distSecurite
    aCoordRenard[2] = x + renardLargeur / 2 + distSecurite
    aCoordRenard[3] = y + renardHauteur / 2 + distSecurite

    // Gestion de l'animation
    if (renardAnimating) {
        renardAnimProgress += 0.02

        if (renardAnimProgress >= 1) {
            if (renardAnimType === 'queue') {
                // Passer à la phase de sautillement après celle de la queu
                renardAnimType = 'sautille'
                renardAnimProgress = 0
            } else {
                // Fin de l'animation (après la queue et le saut )
                renardAnimating = false
                renardAnimProgress = 0
                renardAnimType = 'none'
            }
        }
    }

    // Translation verticale pour le sautillement (se déplace de 10px)
    let translateY = 0
    if (renardAnimType === 'sautille') {
        // 3 petits sauts pour le renard
        translateY = sin(renardAnimProgress * PI * 6) * -10
    }

    plan.push()
    plan.translate(x, y + translateY)
    plan.scale(echelle)

    // Configuration du trait
    plan.stroke(70, 50, 40, 180)
    plan.strokeWeight(3)

    // Corps du renard (orange)
    plan.fill(200, 110, 70)
    plan.ellipse(0, 0, 140, 90)

    // Tête
    plan.ellipse(-40, -40, 60, 60)

    // Oreilles (deux triangles)
    plan.triangle(-70, -70, -50, -120, -20, -70)
    plan.triangle(-40, -65, -15, -115, 10, -65)

    // Museau (plus clair)
    plan.fill(240, 200, 170)
    plan.ellipse(-10, 10, 60, 40)

    // Animation de la queue (balancement)
    let rotationQueue = 0
    if (renardAnimType === 'queue') {
        //Pour le balancement de la queue, on fait 2 tours
        rotationQueue = sin(renardAnimProgress * PI * 4) * 0.3
    }

    plan.push() //Début pour la queue
    plan.translate(60, 10)
    plan.rotate(rotationQueue) // Rotation de la queueen fonction de la progression (ou 0 sinon)
    plan.translate(-60, -10)

    // Queue
    plan.fill(200, 110, 70)
    plan.beginShape()
    plan.vertex(60, 10)
    plan.vertex(120, 40)
    plan.vertex(80, 80)
    plan.vertex(40, 40)
    plan.endShape(CLOSE)

    // Bout de la queue (clair)
    plan.fill(240, 200, 170)
    plan.beginShape()
    plan.vertex(90, 45)
    plan.vertex(110, 60)
    plan.vertex(80, 70)
    plan.endShape(CLOSE)

    plan.pop() // Pour la fin de la rotation de la queue

    plan.pop()
}

// Serpent
function dessinerSerpent(plan, x, y, echelle) {
    const aCoordTeteSerpent = [0, 0]

    // Zone cliquable
    const serpentLargeur = 280 * echelle
    const serpentHauteur = 60 * echelle
    const distSecurite = 20
    aCoordSerpent[0] = x - serpentLargeur / 2 - distSecurite
    aCoordSerpent[1] = y - serpentHauteur / 2 - distSecurite
    aCoordSerpent[2] = x + serpentLargeur + distSecurite
    aCoordSerpent[3] = y + serpentHauteur / 2 + distSecurite

    // Gestion animation
    if (serpentAnimating) {
        serpentAnimProgress += 0.015
        if (serpentAnimProgress >= 1) {
            serpentAnimating = false
            serpentAnimProgress = 0
        }
    }

    // ✅ Slither parameters (only when animating)
    const t = serpentAnimating ? serpentAnimProgress : 0

    // Small forward/back motion (pixels in screen space)
    const moveX = serpentAnimating ? Math.sin(t * Math.PI) * 10 : 0

    // Body wave (in snake local space, before scaling)
    const wave = serpentAnimating ? Math.sin(t * Math.PI * 6) * 10 : 0

    plan.push()
    plan.translate(x + moveX, y)
    plan.scale(echelle)

    // Corps (ondulation)
    plan.stroke(70, 90, 80, 200)
    plan.strokeWeight(6)
    plan.noFill()
    plan.beginShape()
    plan.vertex(-80, 20)

    // ✅ Add wave into the bezier control points
    plan.bezierVertex(-20, -10 + wave, 20, 40 - wave, 80, 10 + wave)
    plan.bezierVertex(120, -10 - wave, 160, 30 + wave, 200, 0)

    plan.endShape()

    // Coord tête (screen space, after moveX)
    aCoordTeteSerpent[0] = (x + moveX) + 200 * echelle
    aCoordTeteSerpent[1] = y

    // Tête
    plan.noStroke()
    plan.fill(90, 130, 110)
    plan.ellipse(200, 0, 30, 20)

    plan.pop()

    // Langue (comme avant)
    if (serpentAnimating) {
        const ROUGE = [220, 50, 50]
        const dir = serpentAnimProgress < 0.5 ? 1 : -1
        const rectLargeur = 20 + 10 * serpentAnimProgress * dir
        const rectHauteur = 10

        plan.fill(ROUGE[0], ROUGE[1], ROUGE[2])
        plan.noStroke()
        plan.rect(
            aCoordTeteSerpent[0] + 10,
            aCoordTeteSerpent[1] - rectHauteur / 2,
            rectLargeur,
            rectHauteur,
            5
        )
    }
}


// Avion accidenté dans le sable
function dessinerAvionAccidente(plan, x, y, echelle) {
    // Définir la zone cliquable de l'avion
    const avionLargeur = 260 * echelle
    const avionHauteur = 120 * echelle
    const distSecurite = 20

    // Calcul approximatif avec la rotation de -0.25
    aCoordAvion[0] = x - avionLargeur - distSecurite
    aCoordAvion[1] = y - avionHauteur / 2 - distSecurite
    aCoordAvion[2] = x + avionLargeur / 2 + distSecurite
    aCoordAvion[3] = y + avionHauteur / 2 + distSecurite

    // Gestion de l'animation
    if (avionAnimating) {
        avionAnimProgress += 0.015

        if (avionAnimProgress >= 1) {
            avionAnimating = false
            avionAnimProgress = 0
        }
    }

    plan.push()
    plan.translate(x, y)
    plan.scale(echelle)
    plan.rotate(-0.25) // Incliné (crashé)

    // Configuration du trait
    plan.stroke(50, 50, 70, 200)
    plan.strokeWeight(4)

    // Cors de l'avion principal (gris foncé)
    plan.fill(80, 80, 100)
    plan.rect(-180, -40, 260, 80, 30)

    // Nez de l'avion
    plan.fill(90, 90, 110)
    plan.rect(-220, -10, 80, 20, 10)

    // Aile cassée
    plan.rect(-40, -60, 120, 30, 12)

    // Morceaux de structure (lignes)
    plan.line(60, -30, 140, -80)
    plan.line(60, 30, 140, 70)

    plan.pop()

    // Animation de fumée (après pop pour ne pas être affectée par scale et rotate)
    if (avionAnimating) {
        plan.noStroke()

        // 4 nuages de fumée avec des phases décalées
        for (let i = 0; i < 4; i++) {
            //on calcule l'avancée de l'animation (modulo 1 pour toujours que ce soit compris entre 0 et 1)
            const phase = (avionAnimProgress + i * 0.25) % 1

            //monte de 0 à 80px
            const hauteurFumee = phase * -80

            // Décalage horizontal aléatoire en fonction du numéro de nuage
            const decalageX = sin(phase * PI * 2 + i) * 15

            //grandit de 15 à 35px
            const taille = 15 + phase * 20

            // diminue son opacité en partant de 255 (opcacité max)
            const opacite = 255 * (1 - phase)

            // Couleur grise
            plan.fill(120, 120, 130, opacite)
            plan.ellipse(aCoordAvion[2] - 4 * distSecurite + decalageX, aCoordAvion[1] + hauteurFumee, taille, taille)
        }
    }
}

// Détection de clic sur le serpent, le renard et l'avion (appelé depuis sketch.js dans mousePressed)
function clicScene3(mouseX, mouseY) {
    const estDansSerpent = mouseX > aCoordSerpent[0] && mouseX < aCoordSerpent[2] && mouseY > aCoordSerpent[1] && mouseY < aCoordSerpent[3]
    const estDansRenard = mouseX > aCoordRenard[0] && mouseX < aCoordRenard[2] && mouseY > aCoordRenard[1] && mouseY < aCoordRenard[3]
    const estDansAvion = mouseX > aCoordAvion[0] && mouseX < aCoordAvion[2] && mouseY > aCoordAvion[1] && mouseY < aCoordAvion[3]

    if (estDansSerpent && !serpentAnimating) {
        console.log('Clic serpent')
        serpentAnimating = true
        serpentAnimProgress = 0
        return true
    }

    if (estDansRenard && !renardAnimating) {
        console.log('Clic renard')
        renardAnimating = true
        renardAnimProgress = 0
        renardAnimType = 'queue'
        return true
    }

    if (estDansAvion && !avionAnimating) {
        console.log('Clic avion')
        avionAnimating = true
        avionAnimProgress = 0
        return true
    }

    return false
}



