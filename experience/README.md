# KingDream — expérience immersive (version interne)

Prototype du nouveau site officiel. Il n'est pas relié au site en ligne et n'est pas indexé (`noindex`).

## Structure

- `index.html` : contenu et sections
- `style.css` : design
- `app.js` : animations au scroll, onde IA (canvas), app mobile interactive, vidéos, portfolio
- `assets/` : logo
- `videos/` : vos vidéos de présentation

## Le parcours au scroll

1. **Hero** : KINGDREAM · Design • Web • Applications • Digital
2. **L'onde IA** : forme lumineuse qui réagit au scroll et à la souris
3. **L'icône** : l'onde se resserre en icône d'application
4. **L'application** : l'icône devient un vrai téléphone (onglets, réservation, fidélité : tout est cliquable)
5. **Le web** : la même app devient une interface web sur ordinateur (plan de salle cliquable)
6. **L'entreprise** : dashboard, automatisation et modules connectés (CRM, facturation, API, cloud…)

Ensuite : services, vidéos, portfolio horizontal, phrase finale, contact.

## Ajouter vos vidéos

Déposez vos fichiers dans `experience/videos/` :

| Projet | Ordinateur | Mobile |
|---|---|---|
| 1 | `projet-1-desktop.mp4` | `projet-1-mobile.mp4` |
| 2 | `projet-2-desktop.mp4` | `projet-2-mobile.mp4` |
| 3 | `projet-3-desktop.mp4` | `projet-3-mobile.mp4` |

Les titres et les chemins se changent en haut de `app.js` (tableau `VIDEOS`).
Tant qu'une vidéo manque, une démo animée du projet s'affiche avec le badge « Aperçu · vidéo à intégrer ».
Conseil : MP4 (H.264), 1920×1200 pour l'ordinateur et 1080×2340 pour le mobile, moins de 10 Mo chacune.

## Réalisations

Les projets du portfolio se modifient dans `app.js` (tableaux `PROJECTS` et `MINI`).
