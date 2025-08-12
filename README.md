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

## Utilisation de Docker Compose pour MongoDB

Pour faciliter la gestion de MongoDB, vous pouvez utiliser Docker Compose.  
Créez un fichier `docker-compose.yml` à la racine du projet avec le contenu suivant :

```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    container_name: entreprise-mongodb
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
    volumes:
      - ./data/mongo:/data/db
```

Pour démarrer MongoDB :

```bash
docker-compose up -d
```

La base de données sera accessible sur `mongodb://root:example@localhost:27017`.

## Notes

- Vérifiez que la configuration Jest (`jest.config.ts`) est bien présente à la racine du projet.
- Les tests utilisent des mocks pour les dépendances Mongoose.


## POSTAN COMPROBACION 

Auth :
## POST /auth/signup
http://localhost:3000/auth/signup

{
  "name": "ahmed",
  "email": "ahmed@gmail.com",
  "password": "password123"
}


## POST /auth/login
http://localhost:3000/auth/login

{
  "email": "ahmed@gmail.com",
  "password": "password123"
}

Response  : 

{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODlhMDdiODg5ZjFjYzhlNjY0ZGUwYTIiLCJlbWFpbCI6ImFobWVkQGdtYWlsLmNvbSIsImlhdCI6MTc1NDkyNTA3MSwiZXhwIjoxNzU0OTI4NjcxfQ.0eR_Iio9iIk7xKvlrTARTGSgUo00bsnuXIAu-b7ZklA"
}

The information stored here is related to : 


## GET /auth/profile

Authorization: Bearer 

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODlhMDdiODg5ZjFjYzhlNjY0ZGUwYTIiLCJlbWFpbCI6ImFobWVkQGdtYWlsLmNvbSIsImlhdCI6MTc1NDkyNTA3MSwiZXhwIjoxNzU0OTI4NjcxfQ.0eR_Iio9iIk7xKvlrTARTGSgUo00bsnuXIAu-b7ZklA

Response : 

{
    "userId": "689a07b889f1cc8e664de0a2",
    "email": "ahmed@gmail.com"
}

Contain playload :  userId and email.

Users :
## GET /users/me

http://localhost:3000/users/me

<<<<<<< HEAD
=======
Authorization: Bearer 

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODlhMDdiODg5ZjFjYzhlNjY0ZGUwYTIiLCJlbWFpbCI6ImFobWVkQGdtYWlsLmNvbSIsImlhdCI6MTc1NDkyNTA3MSwiZXhwIjoxNzU0OTI4NjcxfQ.0eR_Iio9iIk7xKvlrTARTGSgUo00bsnuXIAu-b7ZklA

>>>>>>> d84ee66267ef97fe8799b9a7ae052abd8de6ebe7
Response : 
{
    "_id": "689a07b889f1cc8e664de0a2",
    "name": "ahmed",
    "email": "ahmed@gmail.com",
    "password": "$2b$10$gU.T6yaAgMkWGORhHDiPpuqCs9s2ZM5zlTQj/DcVqPFSO8DweNMcS",
    "__v": 0
}

Projects :

## GET /projects
http://localhost:3000/project

Response : 

{
    "_id": "689a0a9d89f1cc8e664de0a7",
    "name": "Building A",
    "description": "Aaaaaaaa",
    "owner": "689a07b889f1cc8e664de0a2",
    "createdAt": "2025-08-11T15:22:05.096Z",
    "updatedAt": "2025-08-11T15:22:05.096Z",
    "__v": 0
}

## POST /projects
http://localhost:3000/project

Send ; 
{
  "name": "Building A",
  "description": "Aaaaaaaa",
  "owner": "689a07b889f1cc8e664de0a2"
}

Response : 
{
    "name": "Building C",
    "description": "Aaaaaaaa",
    "owner": "689a07b889f1cc8e664de0a2",
    "_id": "689a282d1b6f795ddb18ee70",
    "createdAt": "2025-08-11T17:28:13.038Z",
    "updatedAt": "2025-08-11T17:28:13.038Z",
    "__v": 0
}


## POST /projects/:id/invite

Create a new user : 

POST 
http://localhost:3000/auth/signup

{
  "name": "hasan",
  "email": "hasan@gmail.com",
  "password": "password123"
}

GET http://localhost:3000/users 

.... {
        "_id": "689a0b6689f1cc8e664de0a9",
        "name": "hasan",
        "email": "hasan@gmail.com",
        "password": "$2b$10$J.2JEPpOnUcoT/B2AVvKQO4UqZLROdaY4emCJ3X903Prk.v8ppBIi",
        "__v": 0
    }
]

POST http://localhost:3000/project/689a0a9d89f1cc8e664de0a7/invite

{
  "userId": "689a0b6689f1cc8e664de0a9",
  "role": "Contribuidor"
}

RESPONSE 

{
    "userId": "689a0b6689f1cc8e664de0a9",
    "projectId": "689a0a9d89f1cc8e664de0a7",
    "role": "Contribuidor",
    "_id": "689a0c1d89f1cc8e664de0ad",
    "__v": 0
}



## DELETE /projects/:id
http://localhost:3000/projects/689a0a9d89f1cc8e664de0a7


{
  "userId": "689a07b889f1cc8e664de0a2",
  "role": "Owner"
}

Ant it is deleted. 



## POST /projects/

http://localhost:3000/project/ 689a100189f1cc8e664de0b8/tasks


Get the id of a role contribuidor you need to analise the memberships : 
GET  http://localhost:3000/membership 

Return : 
[
    {
        "_id": "689a0c1d89f1cc8e664de0ad",
        "userId": "689a0b6689f1cc8e664de0a9",
        "projectId": "689a0a9d89f1cc8e664de0a7",
        "role": "Contribuidor",
        "__v": 0
    },
    {
        "_id": "689a0ea389f1cc8e664de0b3",
        "userId": "689a07b889f1cc8e664de0a2",
        "projectId": "689a0a9d89f1cc8e664de0a7",
        "role": "Owner",
        "__v": 0
    }
]

POST 
http://localhost:3000/project/689a100189f1cc8e664de0b8/tasks

{
  "taskId": "689a1829dec04c861ae9eac8",
  "userId": "689a0b6689f1cc8e664de0a9",
  "assignedTo": "689a0b6689f1cc8e664de0a9"
}

Response : 
{
    "_id": "689a1829dec04c861ae9eac8",
    "title": "Nouvelle tâche",
    "description": "Description de la tâche",
    "status": "TODO",
    "assignedTo": "689a0b6689f1cc8e664de0a9",
    "__v": 0,
    "projectId": "689a100189f1cc8e664de0b8"
}



## GET /projects/:projectId/tasks

<<<<<<< HEAD
http://localhost:3000/project/689a100189f1cc8e664de0b8/tasks

POST http://localhost:3000/project/689a100189f1cc8e664de0b8
=======
GET http://localhost:3000/project/689a100189f1cc8e664de0b8/tasks

>>>>>>> d84ee66267ef97fe8799b9a7ae052abd8de6ebe7

Response : 
{
    "_id": "689a100189f1cc8e664de0b8",
    "name": "Building A",
    "description": "Aaaaaaaa",
    "owner": "689a07b889f1cc8e664de0a2",
    "createdAt": "2025-08-11T15:45:05.484Z",
    "updatedAt": "2025-08-11T16:23:18.115Z",
    "__v": 0
}

## PATCH /tasks/:id

http://localhost:3000/task/689a1829dec04c861ae9eac8

{
  "title": "Nouveau tâche",
  "description": "Waaaaaaaaaaaaaaaaa"
}

## DELETE /tasks/:id

http://localhost:3000/task/689a1829dec04c861ae9eac8

