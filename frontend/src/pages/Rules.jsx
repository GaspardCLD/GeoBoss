import React from "react";

function Rules() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Règles du jeu</h1>
      <p className="text-center">
        Bienvenue dans le jeu GeoBoss ! L'objectif du jeu est de deviner la
        distance entre deux villes sur une carte. Voici comment jouer :
      </p>
      <ol className="text-left mt-4">
        <li>Vous serez présenté avec deux villes aléatoires.</li>
        <li>
          Vous devrez entrer votre estimation de la distance entre ces deux
          villes en kilomètres dans la zone de saisie.
        </li>
        <li>
          Après avoir soumis votre estimation, le jeu vous indiquera la distance
          réelle entre les deux villes et la différence entre votre estimation
          et la distance réelle.
        </li>
        <li>
          Votre score sera calculé en fonction de la précision de votre
          estimation. Plus votre estimation est proche de la distance réelle,
          plus votre score sera élevé.
        </li>
        <li>
          Le jeu se compose de 5 étapes. À chaque étape, vous devez estimer la
          distance entre deux nouvelles villes.
        </li>
        <li>
          À la fin des 5 étapes, votre score final sera enregistré. Vous pouvez
          essayer d'améliorer votre score en jouant à nouveau !
        </li>
        <li>
          Votre meilleur score sera également enregistré, alors faites de votre
          mieux pour obtenir le meilleur résultat possible !
        </li>
      </ol>
      <p className="mt-4">
        Prêt à commencer ? Cliquez sur le bouton "Commencer le jeu" pour jouer à
        GeoBoss !
      </p>
    </div>
  );
}

export default Rules;
