class Livre {
    constructor(plan, imageCouverture) {
        this.numPage = 0
        this.plan = plan
        this.countPage = 4
        this.isAnimating = false
        this.animProgress = 0
        this.animDirection = 0
        this.animSpeed = 0.05
        this.imageCouverture = imageCouverture
        this.texteFin = "Envie d'en savoir plus sur cette merveilleuse histoire ? Rendez-vous dans votre bibliothèque préférée !"
    }

    changePage(dir) {
        if (!this.isAnimating && this.numPage + dir >= 0 && this.numPage + dir <= this.countPage) {
            this.isAnimating = true
            this.animProgress = 0
            this.animDirection = dir
        }
    }

    affichePageLivre() {
        // Le centre exacte du livre (entre les pages)
        const centerLivre = [center[0], center[1] + 150]
        const largeur = 250
        const hauteur = 150
        const courbure = 15

        this.plan.clear()
        this.plan.stroke(0)
        this.plan.strokeWeight(2)

        // Si on est sur la page de couverture (page 0)
        if ((this.numPage === 0 || this.numPage === this.countPage) && !this.isAnimating) {
            this.couvertureLivre(centerLivre, largeur, hauteur, courbure)
        }
        // Si l'animation est en cours, on affiche l'animation
        else if (this.isAnimating) {
            this.animerTournagePage(centerLivre, largeur, hauteur, courbure)
        }
        // Sinon on dessine les pages normales
        else {
            this.dessinerPages(centerLivre, largeur, hauteur, courbure)
        }
    }

    dessinerPages(centerLivre, largeur, hauteur, courbure) {
        this.plan.noFill()
        //Le paramètre de profondeur de la page
        const profondeur = -20
        // Ligne centrale du pli
        this.dessinerLigneCentrale(centerLivre, hauteur)

        // Page gauche
        this.dessinerUnePage('gauche', centerLivre, largeur, hauteur, courbure, profondeur)

        // Page de droite
        this.dessinerUnePage('droite', centerLivre, largeur, hauteur, courbure, profondeur)

        // Dessiner les lignes de texte sur les pages
        this.dessinerLignesTexte('gauche', centerLivre, largeur, hauteur, courbure, profondeur)
        this.dessinerLignesTexte('droite', centerLivre, largeur, hauteur, courbure, profondeur)
    }

    dessinerUnePage(cote, centerLivre, largeur, hauteur, courbure, profondeur) {
        // Définir les positions selon le côté
        const signe = cote === 'gauche' ? -1 : 1

        const bordExterieur = centerLivre[0] + signe * largeur
        const bordInterieur = centerLivre[0] + signe * courbure
        const bordInterieurBas = centerLivre[0] + signe * courbure

        // Remplir l'intérieur de la page en blanc
        this.plan.fill(255)
        this.plan.beginShape()
        this.plan.vertex(bordExterieur, centerLivre[1] - hauteur + profondeur)
        this.plan.vertex(bordInterieur, centerLivre[1] - hauteur)
        this.plan.vertex(bordInterieurBas, centerLivre[1] + hauteur)
        this.plan.vertex(bordExterieur, centerLivre[1] + hauteur - profondeur)
        this.plan.endShape(this.plan.CLOSE)

        // Dessiner les contours
        this.plan.noFill()

        // Bord extérieur vertical
        this.plan.curve(
            bordExterieur + signe * 30,
            centerLivre[1] - hauteur - 50,
            bordExterieur,
            centerLivre[1] - hauteur + profondeur,
            bordExterieur,
            centerLivre[1] + hauteur - profondeur,
            bordExterieur + signe * 30,
            centerLivre[1] + hauteur + 50
        )

        // Bord supérieur horizontal
        this.plan.curve(
            bordExterieur + signe * 50,
            centerLivre[1] - hauteur - 30,
            bordExterieur,
            centerLivre[1] - hauteur + profondeur,
            bordInterieur,
            centerLivre[1] - hauteur,
            centerLivre[0] - signe * 50,
            centerLivre[1] - hauteur - 30
        )

        // Bord intérieur (reliure)
        this.plan.curve(
            bordInterieur,
            centerLivre[1] - hauteur - 50,
            bordInterieur,
            centerLivre[1] - hauteur,
            bordInterieurBas,
            centerLivre[1] + hauteur,
            bordInterieur,
            centerLivre[1] + hauteur + 50
        )

        // Bord inférieur horizontal
        this.plan.curve(
            bordExterieur + signe * 50,
            centerLivre[1] + hauteur + 30,
            bordExterieur,
            centerLivre[1] + hauteur - profondeur,
            bordInterieurBas,
            centerLivre[1] + hauteur,
            centerLivre[0] - signe * 50,
            centerLivre[1] + hauteur + 30
        )
    }

    dessinerLigneCentrale(centerLivre, hauteur) {
        this.plan.strokeWeight(3)
        this.plan.line(centerLivre[0], centerLivre[1] + hauteur, centerLivre[0], centerLivre[1] - hauteur)
    }

    dessinerLignesTexte(cote, centerLivre, largeur, hauteur, courbure, profondeur) {
        // Définir les positions selon le côté
        const signe = cote === 'gauche' ? -1 : 1

        const bordExterieur = centerLivre[0] + signe * largeur
        const bordInterieur = centerLivre[0] + signe * courbure

        // Paramètres des lignes
        const nbLignes = 12
        const espacement = (hauteur * 2) / (nbLignes + 1)
        const margeGauche = 20
        const margeRight = 30
        const largeurTexte = largeur - courbure - margeGauche - margeRight

        // Couleur des lignes (gris clair)
        this.plan.stroke(200)
        this.plan.strokeWeight(1)
        this.plan.noFill()

        // Dessiner les lignes horizontales avec l'inclinaison de la perspective
        for (let i = 1; i <= nbLignes; i++) {
            const yPos = centerLivre[1] - hauteur + espacement * i

            // Calculer l'inclinaison liée à la profondeur selon la position verticale
            const ratioVertical = (yPos - (centerLivre[1] - hauteur)) / (hauteur * 2)
            const profondeurActuelle = profondeur * (1 - ratioVertical * 2)

            // Position de début (côté intérieur de la page)
            const xDebut = bordInterieur + signe * margeGauche
            const yDebut = yPos

            // Position de fin (côté extérieur de la page) avec l'inclinaison
            const xFin = bordInterieur + signe * (largeurTexte + margeGauche)
            const yFin = yPos + profondeurActuelle

            // Tracer la ligne avec l'inclinaison
            this.plan.line(xDebut, yDebut, xFin, yFin)
        }
    }

    animerTournagePage(centerLivre, largeur, hauteur, courbure) {
        // Progression de l'animation (0 à 1)
        this.animProgress += this.animSpeed

        //Si supérieur ou = à 1 alors l'animation est terminée
        if (this.animProgress >= 1) {
            this.animProgress = 1
            this.isAnimating = false
            this.numPage += this.animDirection
            return
        }

        // Fonction d'easing pour un mouvement plus naturel
        const eased = this.calculEasing(this.animProgress)

        this.plan.noFill()
        this.plan.strokeWeight(2)

        if (this.animDirection > 0) {
            // Tourner vers la droite (page droite qui se tourne)
            this.dessinerUnePage('gauche', centerLivre, largeur, hauteur, courbure, 0)
            this.dessinerPageQuiTourne('droite', centerLivre, largeur, hauteur, courbure, eased)
        } else {
            // Tourner vers la gauche (page gauche qui se tourne)
            this.dessinerPageQuiTourne('gauche', centerLivre, largeur, hauteur, courbure, eased)
            this.dessinerUnePage('droite', centerLivre, largeur, hauteur, courbure, 0)
        }

        // Ligne centrale du pli
        this.dessinerLigneCentrale(centerLivre, hauteur)
    }

    calculEasing(t) {
        // Easing in-out : accélération puis décélération
        // t : progression de 0 à 1

        if (t < 0.5) {
            // Première moitié : accélération (ease-in)
            return 2 * t * (t / 2)
        } else {
            // Deuxième moitié : décélération (ease-out)
            const reste = 1 - t
            return 1 - 2 * reste * reste * reste
        }
    }

    dessinerPageQuiTourne(cote, centerLivre, largeur, hauteur, courbure, progress) {
        this.plan.strokeWeight(2)

        // Calculer la position de la page en cours de tournage
        const angle = progress * Math.PI // 0 à PI (180°)
        const largeurPage = largeur - courbure
        const largeurVisible = largeurPage * Math.cos(angle)

        // CORRECTION : La profondeur doit être NÉGATIVE pour que la page se lève vers le haut
        const profondeurPage = -largeurPage * Math.sin(angle) * 0.3 // Effet 3D inversé

        // Déterminer la couleur selon l'angle (recto blanc, verso gris clair)
        const couleurPage = angle < Math.PI / 2 ? 255 : 240

        // Définir le signe selon le côté
        const signe = cote === 'gauche' ? -1 : 1

        // Positions clés
        const bordInterieur = centerLivre[0] + signe * courbure
        const bordInterieurBas = centerLivre[0] + signe * courbure * 0.7
        const positionBordMobile = bordInterieur + signe * largeurVisible

        // Reliure centrale (fixe)
        this.plan.noFill()
        this.plan.curve(
            bordInterieur,
            centerLivre[1] - hauteur - 50,
            bordInterieur,
            centerLivre[1] - hauteur,
            bordInterieurBas,
            centerLivre[1] + hauteur,
            bordInterieur,
            centerLivre[1] + hauteur + 50
        )

        // Dessiner la page avec remplissage
        this.plan.fill(couleurPage)
        this.plan.beginShape()
        this.plan.vertex(bordInterieur, centerLivre[1] - hauteur)
        this.plan.vertex(positionBordMobile, centerLivre[1] - hauteur + profondeurPage)
        this.plan.vertex(positionBordMobile, centerLivre[1] + hauteur - profondeurPage)
        this.plan.vertex(bordInterieurBas, centerLivre[1] + hauteur)
        this.plan.endShape(this.plan.CLOSE)

        // Dessiner les contours de la page qui tourne
        this.plan.noFill()

        // Bord mobile vertical
        this.plan.curve(
            positionBordMobile + signe * 30,
            centerLivre[1] - hauteur - 50,
            positionBordMobile,
            centerLivre[1] - hauteur + profondeurPage,
            positionBordMobile,
            centerLivre[1] + hauteur - profondeurPage,
            positionBordMobile + signe * 30,
            centerLivre[1] + hauteur + 50
        )

        // Bord supérieur
        this.plan.curve(
            centerLivre[0] - signe * 50,
            centerLivre[1] - hauteur - 30,
            bordInterieur,
            centerLivre[1] - hauteur,
            positionBordMobile,
            centerLivre[1] - hauteur + profondeurPage,
            positionBordMobile + signe * 50,
            centerLivre[1] - hauteur + profondeurPage - 30
        )

        // Bord inférieur
        this.plan.curve(
            centerLivre[0] - signe * 50,
            centerLivre[1] + hauteur + 30,
            bordInterieurBas,
            centerLivre[1] + hauteur,
            positionBordMobile,
            centerLivre[1] + hauteur - profondeurPage,
            positionBordMobile + signe * 50,
            centerLivre[1] + hauteur - profondeurPage + 30
        )
    }

    couvertureLivre(centerLivre, largeur, hauteur, courbure) {
        const profondeur = -20
        const perspectiveLargeur = 0.85 // Réduction de la largeur en haut

        // Déterminer si on est sur la couverture (début) ou le dos (fin)
        const estCouverture = this.numPage === 0

        // Page centrée
        const largeurPage = largeur - courbure
        const demiLargeur = largeurPage / 2
        const demiLargeurHaut = (largeurPage * perspectiveLargeur) / 2

        // Positions avec perspective (largeur réduite en haut)
        const bordGaucheHaut = centerLivre[0] - demiLargeurHaut
        const bordDroitHaut = centerLivre[0] + demiLargeurHaut
        const bordGaucheBas = centerLivre[0] - demiLargeur
        const bordDroitBas = centerLivre[0] + demiLargeur

        // Couleur beige pour la couverture
        const couleurCouverture = [230, 220, 200]

        // Remplir la couverture avec la couleur
        this.plan.fill(couleurCouverture[0], couleurCouverture[1], couleurCouverture[2])
        this.plan.beginShape()
        this.plan.vertex(bordGaucheHaut, centerLivre[1] - hauteur + profondeur)
        this.plan.vertex(bordDroitHaut, centerLivre[1] - hauteur + profondeur)
        this.plan.vertex(bordDroitBas, centerLivre[1] + hauteur - profondeur)
        this.plan.vertex(bordGaucheBas, centerLivre[1] + hauteur - profondeur)
        this.plan.endShape(this.plan.CLOSE)

        // Dessiner les contours
        this.plan.noFill()
        this.plan.stroke(0)
        this.plan.strokeWeight(2)

        // Bord gauche (avec perspective)
        this.plan.line(bordGaucheHaut, centerLivre[1] - hauteur + profondeur, bordGaucheBas, centerLivre[1] + hauteur - profondeur)

        // Bord supérieur horizontal
        this.plan.line(bordGaucheHaut, centerLivre[1] - hauteur + profondeur, bordDroitHaut, centerLivre[1] - hauteur + profondeur)

        // Bord droit (avec perspective)
        this.plan.line(bordDroitHaut, centerLivre[1] - hauteur + profondeur, bordDroitBas, centerLivre[1] + hauteur - profondeur)

        // Bord inférieur horizontal
        this.plan.line(bordGaucheBas, centerLivre[1] + hauteur - profondeur, bordDroitBas, centerLivre[1] + hauteur - profondeur)

        // Ajouter le contenu (image ou texte)
        if (estCouverture) {
            // Image de couverture avec perspective

            const hauteurPageImage = (hauteur - profondeur) * 2

            // Découper l'image en bandes horizontales pour simuler la perspective
            const nbBandes = 50
            const hauteurBande = hauteurPageImage / nbBandes
            const hauteurBandeImg = this.imageCouverture.height / nbBandes

            this.plan.noStroke()

            for (let i = 0; i < nbBandes; i++) {
                // Calculer la position verticale de cette bande
                const ratio = i / nbBandes
                const y = centerLivre[1] - hauteur + profondeur + ratio * hauteurPageImage

                // Interpoler la largeur entre le haut et le bas
                const largeurBande = demiLargeurHaut * 2 + ratio * (demiLargeur * 2 - demiLargeurHaut * 2)
                const xGauche = centerLivre[0] - largeurBande / 2

                // Dessiner cette bande de l'image
                this.plan.image(
                    this.imageCouverture,
                    xGauche,
                    y,
                    largeurBande,
                    hauteurBande,
                    0,
                    i * hauteurBandeImg,
                    this.imageCouverture.width,
                    hauteurBandeImg
                )
            }

            // Redessiner les contours par-dessus l'image
            this.plan.noFill()
            this.plan.stroke(0)
            this.plan.strokeWeight(2)
            this.plan.line(bordGaucheHaut, centerLivre[1] - hauteur + profondeur, bordGaucheBas, centerLivre[1] + hauteur - profondeur)
            this.plan.line(bordGaucheHaut, centerLivre[1] - hauteur + profondeur, bordDroitHaut, centerLivre[1] - hauteur + profondeur)
            this.plan.line(bordDroitHaut, centerLivre[1] - hauteur + profondeur, bordDroitBas, centerLivre[1] + hauteur - profondeur)
            this.plan.line(bordGaucheBas, centerLivre[1] + hauteur - profondeur, bordDroitBas, centerLivre[1] + hauteur - profondeur)
        } else {
            // Dos du livre: Texte pour inciter à lire la suite
            this.plan.fill(80)
            this.plan.noStroke()
            this.plan.textAlign(this.plan.CENTER, this.plan.CENTER)
            this.plan.textSize(14)
            this.plan.textStyle(this.plan.NORMAL)

            // Définir la largeur de la zone de texte
            const largeurTexte = largeurPage * 0.8 // 80% de la largeur de la page
            const xTexte = centerLivre[0] - largeurTexte / 2
            const yTexte = centerLivre[1] - 50 // Ajuster la position verticale si besoin

            this.plan.text(this.texteFin, xTexte, yTexte, largeurTexte)
        }

        // Réinitialiser le style de texte
        this.plan.textStyle(this.plan.NORMAL)
    }
}
