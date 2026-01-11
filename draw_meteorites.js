// Fichier pour gérer l'animation des pluies de météores (utilisé dans les scènes 1 et 2)

//Fonction permettant de créer un météore avec des données aléatoires (angle, couleur, vitesse...)
function creerMeteore(plan) {
    const angle = random(radians(20), radians(40))
    const vitesse = random(12, 22)

    return {
        x: random(-200, plan.width + 200),
        y: random(-120, -20),
        vx: cos(angle) * vitesse,
        vy: sin(angle) * vitesse,
        longueur: random(80, 200),
        epaisseur: random(1.2, 2.8),
        vie: 255,
        fadeSpeed: random(3, 6),
        derive: random(-0.02, 0.02),
        teinte: random(0, 1),
    }
}

//Anime le météore
function animerMeteore(meteore) {
    // Rotation légère de la trajectoire
    const rotation = meteore.derive * 0.002
    const cosR = cos(rotation)
    const sinR = sin(rotation)
    const nouveauVx = meteore.vx * cosR - meteore.vy * sinR
    const nouveauVy = meteore.vx * sinR + meteore.vy * cosR

    meteore.vx = nouveauVx
    meteore.vy = nouveauVy
    meteore.x += meteore.vx
    meteore.y += meteore.vy
    meteore.vie -= meteore.fadeSpeed
}

function dessinerMeteore(plan, meteore) {
    // Calculer la direction et la queue
    const magnitude = sqrt(meteore.vx * meteore.vx + meteore.vy * meteore.vy)
    const dirX = meteore.vx / magnitude
    const dirY = meteore.vy / magnitude

    const queueX = meteore.x + dirX * -meteore.longueur
    const queueY = meteore.y + dirY * -meteore.longueur

    //couleur entre bleu froid et jaune chaud
    const couleurFroide = [120, 180, 255]
    const couleurChaude = [255, 210, 140]
    const r = map(meteore.teinte, 0, 1, couleurFroide[0], couleurChaude[0])
    const g = map(meteore.teinte, 0, 1, couleurFroide[1], couleurChaude[1])
    const b = map(meteore.teinte, 0, 1, couleurFroide[2], couleurChaude[2])

    plan.noFill()
    plan.strokeCap(ROUND)

    // Traînée externe (halo)
    plan.stroke(r, g, b, meteore.vie * 0.25)
    plan.strokeWeight(meteore.epaisseur * 5.0)
    plan.line(meteore.x, meteore.y, queueX, queueY)

    // Traînée moyenne
    plan.stroke(r, g, b, meteore.vie * 0.45)
    plan.strokeWeight(meteore.epaisseur * 2.6)
    plan.line(meteore.x, meteore.y, queueX, queueY)

    // Traînée centrale blanche
    plan.stroke(255, 255, 255, meteore.vie * 0.9)
    plan.strokeWeight(meteore.epaisseur)
    plan.line(meteore.x, meteore.y, queueX, queueY)

    // Point lumineux à la tête
    plan.noStroke()
    plan.fill(255, 255, 255, meteore.vie)
    plan.circle(meteore.x, meteore.y, meteore.epaisseur * 4.2)
}

//Vérifie si un météore est "mort" (hors écran ou vie épuisée / éteint)
function meteoreMort(plan, meteore) {
    return meteore.vie <= 0 || meteore.x > plan.width + 400 || meteore.y > plan.height + 400
}

// Pluie du météores
function dessinerPluieDeMeteores(plan) {
    // Apparition aléatoire de nouveaux météores
    const chanceApparition = 0.08
    if (random() < chanceApparition && meteores1.length < MAX_METEORES) {
        meteores1.push(creerMeteore(plan))
    }

    // Mettre à jour et dessiner les météores (en sens inverse pour pouvoir supprimer)
    for (let i = meteores1.length - 1; i >= 0; i--) {
        const meteore = meteores1[i]

        // Animation
        animerMeteore(meteore)

        // Dessin
        dessinerMeteore(plan, meteore)

        // Suppression si mort
        if (meteoreMort(plan, meteore)) {
            meteores1.splice(i, 1)
        }
    }
}
