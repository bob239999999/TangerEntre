### Exemple de requête POSTMAN pour tester l’upload d’un audio

Envoyez une requête POST vers votre endpoint `/song/upload` avec les paramètres nécessaires :

- **URL** : `http://localhost:3000/song/upload`
- **Méthode** : POST
- **Type** : `form-data`
- **Champs** :
  - `audio` (Type : File) → Sélectionnez un fichier audio sur votre disque.
  - `title` (Type : Text) → Le titre de la chanson.
  - `userId` (Type : Text ou Number) → L’ID utilisateur.

---

#### Exemple de configuration POSTMAN

POST http://localhost:3000/song/upload
Content-Type: multipart/form-data

Body (form-data) :
  audio   | File   | [Sélectionnez un fichier audio .mp3/.wav/.ogg]
  title   | Text   | Ma chanson préférée
  userId  | Text   | 42

Réponse attendue :
{
  "message": "Audio enregistré",
  "id": 1
}
