//Ce script permettra la gestion de la scène et l'interaction avec les boutons (script principal)

//Taille arbitraire du canva (pour simplifier le code)
//Définition des variables globales
const tailleCanva = [1100, 700]
const center = [550, 350]
const tailleBtn = 60
let livre
let firstPlan, secondPlan, backgroundPlan
let imageCouverture

function preload() {
    // Charger l'image avant le setup
    imageCouverture = loadImage('couverture_img.jpg')
}

function setup() {
    createCanvas(tailleCanva[0], tailleCanva[1])
    //2e plan pour le livre et l'image
    secondPlan = createGraphics(tailleCanva[0], tailleCanva[1])
    //Premier plan pour les btn
    firstPlan = createGraphics(tailleCanva[0], tailleCanva[1])
    //Plan d'arrière-plan pour la scène
    backgroundPlan = createGraphics(tailleCanva[0], tailleCanva[1])
    livre = new Livre(secondPlan, imageCouverture)
}

function draw() {
    background(200)
    creerBoutons()

    //Affichage de la scène selon le numéro de la page courante
    switch (livre.numPage) {
        case 0:
            backgroundPlan.clear()
            setupScene0(backgroundPlan)
            break
        case 1:
            backgroundPlan.clear()
            break
        case 2:
            backgroundPlan.clear()
            break
        case 3:
            backgroundPlan.clear()
            break
        case 4:
            backgroundPlan.clear()
            setupScene4(backgroundPlan)
            break
    }
    livre.affichePageLivre(secondPlan)

    // D'abord l'arrière-plan de la scène, puis le livre, puis les boutons
    image(backgroundPlan, 0, 0)
    image(secondPlan, 0, 0)
    image(firstPlan, 0, 0)
}

function creerBoutons() {
    // Effacer puis redessiner les boutons à chaque frame
    firstPlan.clear()
    firstPlan.noStroke()

    const blueColor = [0, 0, 255]
    const greyColor = [80, 80, 80]

    // Bouton droit (aller page suivante)
    const estDernierePage = livre.numPage === livre.countPage
    if (estDernierePage) {
        firstPlan.fill(greyColor[0], greyColor[1], greyColor[2])
    } else {
        firstPlan.fill(blueColor[0], blueColor[1], blueColor[2])
    }
    firstPlan.ellipse(tailleCanva[0] - tailleBtn, center[1], tailleBtn, tailleBtn)

    // Bouton gauche (aller page précédente)
    const estPremierePage = livre.numPage === 0
    if (estPremierePage) {
        firstPlan.fill(greyColor[0], greyColor[1], greyColor[2])
    } else {
        firstPlan.fill(blueColor[0], blueColor[1], blueColor[2])
    }
    firstPlan.ellipse(tailleBtn, center[1], tailleBtn, tailleBtn)

    // Ajouter le texte des flèches (toujours blanc)
    firstPlan.textSize(40)
    firstPlan.textAlign(CENTER, CENTER)
    firstPlan.fill(255)
    firstPlan.text('>', tailleCanva[0] - tailleBtn, center[1])
    firstPlan.text('<', tailleBtn, center[1])
}

function mousePressed() {
    // Bouton droit (>)
    if (dist(mouseX, mouseY, tailleCanva[0] - tailleBtn, center[1]) < tailleBtn / 2) {
        livre.changePage(1)
    }

    // Bouton gauche (<)
    if (dist(mouseX, mouseY, tailleBtn, center[1]) < tailleBtn / 2) {
        livre.changePage(-1)
    }
}
