// Fichier utilitaire permettant la génération détoiles scintillantes
//Sera utilisé pour les scènes 1, 2 et 3

//Initialise un tableau d'étoiles avec des propriétés aléatoires
function initEtoiles(plan, etoiles) {
    etoiles = []
    const nbEtoiles = 220
    for (let i = 0; i < nbEtoiles; i++) {
        etoiles.push({
            x: random(plan.width),
            y: random(plan.height),
            rayon: random(0.8, 2.2),
            alpha: random(120, 220),
            phase: random(8),
            vitesseScintillement: random(0.5, 1.5),
            scintille: random() < 0.15,
        })
    }

    return etoiles
}

//Dessine un ciel étoilé avec animation de scintillement
function dessinerEtoiles(plan, etoiles) {
    plan.noStroke()

    //Etoiles comme tableau d'étoiles qui sera passé selon lascène dans laquelle on se trouve
    for (let etoile of etoiles) {
        // Animation du scintillement
        if (etoile.scintille) {
            etoile.phase += 0.02 * etoile.vitesseScintillement
        }

        // Calcul de l'alpha avec scintillement
        const variation = etoile.scintille ? sin(etoile.phase) * 65 : 0
        const alpha = etoile.alpha + variation

        // Taille variable si l'étoile scintille
        //Sinus utilisé comme la scène 0 et 4
        const taille = etoile.scintille ? etoile.rayon + 0.6 * (0.5 + sin(etoile.phase)) : etoile.rayon

        // Dessiner l'étoile
        plan.fill(255, 255, 255, alpha)
        plan.circle(etoile.x, etoile.y, taille)

        // Halo pour les étoiles qui scintillent
        if (etoile.scintille) {
            plan.fill(255, 255, 255, alpha * 0.35)
            plan.circle(etoile.x, etoile.y, taille * 2.2)
        }
    }
}
