//Fichier très importtant car réutilisé dans toute les scènes (1,2,3)
//Permet de dessiner le petit prince de dos avec une échelle différente et des coordonnées diffréentes

//Dessine le petit prince de dos
function dessinerPetitPrince(plan, x, y, echelle = 1) {
    plan.push()
    plan.translate(x, y)
    plan.scale(echelle)

    // Palette de couleurs
    const couleurCheveux = [240, 200, 60]
    const couleurEcharpe = [210, 60, 60]
    const couleurManteau = [70, 150, 95]
    const couleurCeinture = [200, 70, 70]
    const couleurPantalon = [90]
    const couleurBottes = [60]
    const couleurPeau = [255, 220, 185]

    // Configuration du trait
    plan.stroke(40)
    plan.strokeWeight(3)
    plan.strokeJoin(ROUND)
    plan.strokeCap(ROUND)

    // tête
    plan.fill(...couleurPeau)
    plan.ellipse(0, -190, 92, 92)

    // Cheveux (forme organique avec vertex)
    plan.fill(...couleurCheveux)
    plan.noStroke()
    plan.beginShape()
    plan.vertex(-42, -205)
    plan.vertex(-55, -220)
    plan.vertex(-38, -230)
    plan.vertex(-20, -244)
    plan.vertex(-4, -230)
    plan.vertex(12, -248)
    plan.vertex(26, -230)
    plan.vertex(44, -238)
    plan.vertex(58, -218)
    plan.vertex(42, -202)
    plan.vertex(52, -184)
    plan.vertex(28, -180)
    plan.vertex(14, -170)
    plan.vertex(-10, -174)
    plan.vertex(-28, -180)
    plan.vertex(-52, -188)
    plan.endShape(CLOSE)

    // Contour de la tête
    plan.stroke(40)
    plan.strokeWeight(3)
    plan.noFill()
    plan.ellipse(0, -190, 92, 92)

    // Cou
    plan.fill(...couleurPeau)
    plan.noStroke()
    plan.rect(-11, -150, 22, 25, 8)

    plan.stroke(40)
    plan.strokeWeight(3)
    plan.fill(...couleurEcharpe)

    // Partie enroulée autour du cou
    plan.beginShape()
    plan.vertex(-52, -150)
    plan.bezierVertex(-32, -172, 32, -172, 52, -150)
    plan.bezierVertex(32, -132, -32, -132, -52, -150)
    plan.endShape(CLOSE)

    plan.ellipse(-8, -142, 20, 16)

    // Écharpe qui vole
    const t = frameCount * 0.08
    const baseWave = sin(t) * 4
    const midWave = sin(t + 0.7) * 6
    const tipWave = sin(t + 1.3) * 10
    const tipSway = sin(t + 1.3) * 6

    plan.beginShape()
    plan.vertex(-18, -142 + baseWave)
    plan.bezierVertex(-85, -150 + baseWave, -140, -125 + midWave, -175 + tipSway, -95 + tipWave)
    plan.bezierVertex(-150 + tipSway * 0.6, -78 + tipWave * 0.6, -112, -82 + midWave, -90, -70 + baseWave)
    plan.bezierVertex(-75, -60 + midWave, -78, -36 + baseWave, -98 + tipSway * 0.5, -28 + tipWave * 0.4)
    plan.bezierVertex(-50, -22 + baseWave, -24, -68 + midWave, -18, -142 + baseWave)
    plan.endShape(CLOSE)

    // MANTEAU VERT
    plan.fill(...couleurManteau)
    plan.stroke(40)
    plan.strokeWeight(3)

    // Corps du manteau
    plan.beginShape()
    plan.vertex(-55, -130)
    plan.bezierVertex(-72, -75, -70, 20, -42, 105)
    plan.bezierVertex(-25, 150, 25, 150, 42, 105)
    plan.bezierVertex(70, 20, 72, -75, 55, -130)
    plan.bezierVertex(22, -155, -22, -155, -55, -130)
    plan.endShape(CLOSE)

    // Manche gauche
    plan.beginShape()
    plan.vertex(-55, -122)
    plan.bezierVertex(-88, -92, -90, -25, -78, 25)
    plan.bezierVertex(-70, 60, -55, 70, -45, 55)
    plan.bezierVertex(-55, 20, -50, -40, -40, -78)
    plan.endShape(CLOSE)

    // Manche droite
    plan.beginShape()
    plan.vertex(55, -122)
    plan.bezierVertex(88, -92, 90, -25, 78, 25)
    plan.bezierVertex(70, 60, 55, 70, 45, 55)
    plan.bezierVertex(55, 20, 50, -40, 40, -78)
    plan.endShape(CLOSE)

    // Mains
    plan.fill(...couleurPeau)
    plan.stroke(40)
    plan.strokeWeight(3)
    plan.ellipse(-52, 58, 18, 14)
    plan.ellipse(52, 58, 18, 14)

    // CEINTURE ROUGE
    plan.fill(...couleurCeinture)
    plan.rect(-45, -10, 90, 18, 10)

    // Boucle de ceinture (dorée)
    plan.fill(235, 200, 120)
    plan.rect(8, -7, 16, 12, 4)

    // PANTALON GRIS
    plan.fill(...couleurPantalon)
    plan.noStroke()
    plan.rect(-28, 105, 22, 60, 10)
    plan.rect(6, 105, 22, 60, 10)

    // BOTTES NOIRES
    plan.fill(...couleurBottes)
    plan.stroke(40)
    plan.strokeWeight(3)

    // Botte gauche
    plan.beginShape()
    plan.vertex(-35, 162)
    plan.vertex(-10, 162)
    plan.vertex(-6, 188)
    plan.vertex(-18, 192)
    plan.vertex(-44, 192)
    plan.endShape(CLOSE)

    // Botte droite
    plan.beginShape()
    plan.vertex(10, 162)
    plan.vertex(35, 162)
    plan.vertex(44, 192)
    plan.vertex(18, 192)
    plan.vertex(6, 188)
    plan.endShape(CLOSE)

    plan.pop()
}
