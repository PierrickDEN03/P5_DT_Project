//Fichier pour la création de l'astéroide (scène 1 et 2)

//Fonction utilitaire pour récupérer les coordonnées / valeurs de l'asteroide
//Calcul la taille et les coordonées de l'astéroide en fonction des ratio données en entrées
function obtenirMetriquesAsteroide(plan, centreXRatio = 0.52, centreYRatio = 0.78, rayonXRatio = 0.2, rayonYRatio = 0.14) {
    return {
        centreX: plan.width * centreXRatio,
        centreY: plan.height * centreYRatio,
        rayonX: plan.width * rayonXRatio,
        rayonY: plan.height * rayonYRatio,
    }
}

//Fonction appelé pour dessinner l'asteroide
function dessinerAsteroideComplet(plan, metriques) {
    const m = metriques

    plan.noStroke()

    // Corps principal de l'astéroïde (gris)
    plan.fill(216, 223, 232)
    plan.ellipse(m.centreX, m.centreY, m.rayonX * 2.1, m.rayonY * 2.1)

    // Reflet 1
    plan.fill(200, 208, 218, 160)
    plan.ellipse(m.centreX + m.rayonX * 0.2, m.centreY + m.rayonY * 0.1, m.rayonX * 1.7, m.rayonY * 1.6)

    // Reflet 2
    plan.fill(190, 198, 210, 130)
    plan.ellipse(m.centreX - m.rayonX * 0.35, m.centreY + m.rayonY * 0.25, m.rayonX * 0.7, m.rayonY * 0.5)

    // Éléments sur l'astéroïde
    dessinerVolcans(plan, m.centreX, m.centreY - m.rayonY * 0.55, m.rayonX, m.rayonY)
    dessinerBaobabs(plan, m.centreX - m.rayonX * 0.55, m.centreY - m.rayonY * 0.3, m.rayonX * 0.3, m.rayonY * 0.2)

    dessinerRoseSousCloche(plan, m.centreX + m.rayonX * 0.25, m.centreY - m.rayonY * 0.45, m.rayonX * 0.18)
}

//Volcans de l'astéroide
function dessinerVolcans(plan, centreX, hauteurY, largeur, hauteur) {
    const volcans = [
        { x: centreX - largeur * 0.15, y: hauteurY, actif: true },
        { x: centreX + largeur * 0.1, y: hauteurY - hauteur * 0.05, actif: true },
        { x: centreX + largeur * 0.35, y: hauteurY + hauteur * 0.08, actif: false },
    ]

    for (let volcan of volcans) {
        // Corps du volcan (triangle)
        plan.stroke(90, 90, 100, 200)
        plan.strokeWeight(2)
        plan.fill(126, 120, 125)
        plan.beginShape()
        plan.vertex(volcan.x - largeur * 0.09, volcan.y + hauteur * 0.14)
        plan.vertex(volcan.x, volcan.y - hauteur * 0.08)
        plan.vertex(volcan.x + largeur * 0.09, volcan.y + hauteur * 0.14)
        plan.endShape(CLOSE)

        if (volcan.actif) {
            // Lave rouge
            plan.noStroke()
            plan.fill(230, 90, 70)
            plan.ellipse(volcan.x, volcan.y - hauteur * 0.05, largeur * 0.06, hauteur * 0.06)

            // Lueur jaune
            plan.fill(245, 170, 90, 200)
            plan.ellipse(volcan.x, volcan.y - hauteur * 0.07, largeur * 0.035, hauteur * 0.035)

            // Vapeur simple
            const t = frameCount * 0.08
            plan.noStroke()
            for (let i = 0; i < 3; i++) {
                const drift = sin(t + i) * largeur * 0.04
                const rise = (i + 1) * hauteur * 0.08 + (t * 3) % (hauteur * 0.18)
                const alpha = 190 - i * 35
                plan.fill(220, 220, 225, alpha)
                plan.ellipse(volcan.x + drift, volcan.y - hauteur * 0.14 - rise, largeur * 0.045, hauteur * 0.045)
            }
        } else {
            // Cratère éteint
            plan.stroke(80, 80, 90, 200)
            plan.strokeWeight(2)
            plan.line(volcan.x - largeur * 0.03, volcan.y - hauteur * 0.06, volcan.x + largeur * 0.03, volcan.y - hauteur * 0.06)
        }
    }
}

//Baobabs de l'astéroide
function dessinerBaobabs(plan, baseX, baseY, largeur, hauteur) {
    for (let i = 0; i < 3; i++) {
        const x = baseX + i * largeur * 0.5
        const y = baseY + sin(i * 1.2) * hauteur * 0.15

        // Tronc
        plan.stroke(70, 100, 70, 200)
        plan.strokeWeight(2)
        plan.line(x, y, x + largeur * 0.05, y - hauteur * 0.5)

        // Feuillage (2 cercles verts)
        plan.noStroke()
        plan.fill(110, 170, 90)
        plan.ellipse(x + largeur * 0.05, y - hauteur * 0.55, largeur * 0.18, hauteur * 0.18)
        plan.ellipse(x + largeur * 0.12, y - hauteur * 0.45, largeur * 0.16, hauteur * 0.16)
    }
}

//Rose sous cloche
function dessinerRoseSousCloche(plan, x, y, taille) {
    const largeurCloche = taille * 1.6
    const hauteurCloche = taille * 1.4

    // Socle
    plan.noStroke()
    plan.fill(220, 210, 200)
    plan.rect(x - largeurCloche * 0.3, y + hauteurCloche * 0.5, largeurCloche * 0.6, hauteurCloche * 0.12, 6)

    // Tige de la rose
    plan.stroke(80, 120, 80)
    plan.strokeWeight(2)
    plan.line(x, y + hauteurCloche * 0.3, x, y + hauteurCloche * 0.05)

    // Pétales de la rose
    plan.noStroke()
    plan.fill(190, 60, 80)
    plan.ellipse(x, y, taille * 0.35, taille * 0.35)
    plan.fill(210, 90, 110)
    plan.ellipse(x - taille * 0.08, y - taille * 0.05, taille * 0.22, taille * 0.22)

    // Cloche en verre
    plan.noFill()
    plan.stroke(230, 235, 245, 180)
    plan.strokeWeight(2)
    plan.arc(x, y + hauteurCloche * 0.25, largeurCloche, hauteurCloche, PI, TWO_PI)

    // Reflet sur le verre
    plan.stroke(255, 255, 255, 130)
    plan.arc(x - largeurCloche * 0.1, y + hauteurCloche * 0.25, largeurCloche * 0.6, hauteurCloche * 0.7, PI, TWO_PI)
}
