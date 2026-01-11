//Ce script permettra la gestion de la scène et l'interaction avec les boutons (script principal)

//Taille arbitraire du canva (pour simplifier le code)
//Définition des variables globales
const tailleCanva = [1100, 700]
const center = [550, 350]
const tailleBtn = 60
let livre
let firstPlan, secondPlan, backgroundPlan
let imageCouverture

//Affichage de façon différente pour le dos du livre (d'où la chaine vide)
const aTexte = [
    'BIENVENUE DANS UNE HISTOIRE MAGIQUE ET MERVEILLEUSE! ',
    'SOUS LES ETOILES, UNE PANNE DANS LE DESERT SCELLE UNE RENCONTRE MAGIQUE',
    "VOGUEZ D'ASTEROIDE EN ASTEROIDE A LA DECOUVERTE DE LEURS CURIEUX HABITANTS",
    'AU CREUX DES DUNES, APPRIVOISEZ LE SECRET DE CE QUI EST INVISBLE POUR LES YEUX',
    '',
]

//Gestion de la taille de lazone de texte -> Evite de se superposer aux éléments de fond
const aMaxWidth = [900, 500, 300, 900, 0]
//Variables pour animation de texte
let textAlpha = 0
let currentTextPage = -1

function preload() {
    // Charger l'image avant la fonction setup
    imageCouverture = loadImage('couverture_img.jpg')
}

function setup() {
    createCanvas(tailleCanva[0], tailleCanva[1])
    //2e plan pour le livre
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
            showTexte(0)
            break
        case 1:
            backgroundPlan.clear()
            setupScene1(backgroundPlan)
            showTexte(1)
            break
        case 2:
            backgroundPlan.clear()
            setupScene2(backgroundPlan)
            showTexte(2)
            break
        case 3:
            backgroundPlan.clear()
            setupScene3(backgroundPlan)
            showTexte(3)
            break
        case 4:
            backgroundPlan.clear()
            setupScene4(backgroundPlan, livre)
            break
    }
    //Si on atteint la page de fin, un bouton apparait pour recommencer
    if (livre.numPage === livre.countPage) {
        showScene4ResetButton(livre)
    } else {
        hideScene4ResetButton()
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

function showTexte(numPage) {
    // Réinitialiser si changement de page
    if (currentTextPage !== numPage) {
        textAlpha = 0
        currentTextPage = numPage
    }

    // Animer l'apparition du texte
    if (textAlpha < 255) {
        textAlpha = min(textAlpha + 3, 255)
    }

    displayAnimatedText(firstPlan, aTexte[numPage], numPage, textAlpha)
}

function displayAnimatedText(plan, texte, numPage, textAlpha) {
    plan.textSize(18)
    plan.textAlign(CENTER, TOP)
    plan.fill(255, textAlpha)

    const y = 50
    const maxWidth = aMaxWidth[numPage]

    plan.text(texte, tailleCanva[0] / 2 - maxWidth / 2, y, maxWidth)
}
