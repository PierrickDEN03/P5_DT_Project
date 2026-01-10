// SCÈNE 3 : PAGE 3
//Par simplicité, le renard, l'avion et le serpent sont dessinés avec des valeurs absolus

// État de la scène
let etoiles3 = []
let isInit3 = false
let hauteur, largeur

// Paramètres du désert (largeur et hauteur de référence)
const aDesert = {
    largeur: 1.2, // Multiplicateur de la largeur du plan
    hauteur: 1.2, // Multiplicateur de la hauteur du plan
}

// Fonction principale
function setupScene3(plan) {
    hauteur = plan.height
    largeur = plan.width

    // Dessiner tous les éléments
    dessinerDegradeCrepuscule(plan)
    //Création des étoiles et affichage (cf fichier draw_etoiles)
    initEtoiles(plan, etoiles3)
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
    plan.push()
    plan.translate(x, y)
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

    // Queue touffue
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

    plan.pop()
}

// Serpent ondulant
function dessinerSerpent(plan, x, y, echelle) {
    plan.push()
    plan.translate(x, y)
    plan.scale(echelle)

    // Corps du serpent (courbe ondulante)
    plan.stroke(70, 90, 80, 200)
    plan.strokeWeight(6)
    plan.noFill()
    plan.beginShape()
    plan.vertex(-80, 20)
    //Permet plus facilement d'avoir des objets courbés
    plan.bezierVertex(-20, -10, 20, 40, 80, 10)
    plan.bezierVertex(120, -10, 160, 30, 200, 0)
    plan.endShape()

    // Tête du serpent
    plan.noStroke()
    plan.fill(90, 130, 110)
    plan.ellipse(200, 0, 30, 20)

    plan.pop()
}

// Avion accidenté dans le sable
function dessinerAvionAccidente(plan, x, y, echelle) {
    plan.push()
    plan.translate(x, y)
    plan.scale(echelle)
    plan.rotate(-0.25) // Incliné (crashé)

    // Configuration du trait
    plan.stroke(50, 50, 70, 200)
    plan.strokeWeight(4)

    // Fuselage principal (gris foncé)
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
}
