# Entreprise - NestJS Project

Ce projet utilise **NestJS** pour une architecture modulaire et évolutive.

## Structure du projet

Chaque entité principale est organisée comme un module NestJS :
- **Auth** : gestion de l’authentification et des jetons.
- **Membership** : gestion des relations utilisateur-projet.
- **Task** : gestion des tâches liées aux projets.
- **Project** : gestion des projets et de leurs tâches.
- **User** : gestion des utilisateurs.

## Installation

```bash
npm install
```

## Démarrage du projet

```bash
cd entreprise
npm run start:dev
```

## Exécution des tests unitaires

Pour lancer tous les tests unitaires du projet :

```bash
npm test
```

Pour exécuter les tests d’un composant spécifique :

- **User**  
  ```bash
  npx jest src/User/user.service.spec.ts
  ```
- **Task**  
  ```bash
  npx jest src/Task/task.service.spec.ts
  ```
- **Project**  
  ```bash
  npx jest src/Project/project.service.spec.ts
  ```
- **Membership**  
  ```bash
  npx jest src/Membership/membership.service.spec.ts
  ```

## Notes

- Vérifiez que la configuration Jest (`jest.config.ts`) est bien présente à la racine du projet.
- Les tests utilisent des mocks pour les dépendances Mongoose.


