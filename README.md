# API de Gestion du Parc Automobile

Une API REST complète pour gérer un parc automobile d'entreprise, développée avec Node.js, Express et Sequelize.

## 🚀 Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimaliste
- **Sequelize** - ORM pour la gestion de la base de données
- **MariaDB** - Base de données relationnelle
- **Morgan** - Logging des requêtes HTTP
- **Body-parser** - Parsing des requêtes JSON

## 📦 Installation

1. **Prérequis**
   - Node.js (version LTS recommandée)
   - XAMPP (pour MariaDB)
   - Un client REST (Postman ou Insomnia)

2. **Cloner le projet**
   ```bash
   git clone https://github.com/Ehonam/node.git
   cd node
   ```

3. **Installer les dépendances**
   ```bash
   npm install
   ```

4. **Configuration de la base de données**
   - Démarrer XAMPP et activer MySQL/MariaDB
   - Créer une base de données nommée `parc_auto` via phpMyAdmin
   - Les tables seront créées automatiquement au démarrage

5. **Lancer l'application**
   ```bash
   npm start
   ```

## 🛣️ Endpoints de l'API

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Informations de l'API |
| GET | `/api/cars` | Liste toutes les voitures |
| GET | `/api/cars/:id` | Récupère une voiture par ID |
| POST | `/api/cars` | Crée une nouvelle voiture |
| PUT | `/api/cars/:id` | Met à jour une voiture |
| DELETE | `/api/cars/:id` | Supprime une voiture |

## 📊 Modèle de données

### Voiture (Car)

```json
{
  "id": 1,
  "name": "Véhicule de service",
  "brand": "Toyota",
  "year": 2020,
  "image": "https://example.com/image.jpg",
  "assignedTo": ["Jean Dupont", "Marie Martin"],
  "assignmentDate": "2023-01-15T10:00:00.000Z",
  "created": "2023-01-15T10:00:00.000Z"
}
```

## 📝 Exemples d'utilisation

### Créer une voiture
```bash
POST /api/cars
Content-Type: application/json

{
  "name": "Véhicule de livraison",
  "brand": "Ford",
  "year": 2022,
  "image": "https://example.com/ford.jpg",
  "assignedTo": ["Paul Martin"],
  "assignmentDate": "2023-01-15"
}
```

### Mettre à jour une voiture
```bash
PUT /api/cars/1
Content-Type: application/json

{
  "assignedTo": ["Jean Dupont", "Sophie Dubois"]
}
```

## 🏗️ Architecture du projet

```
├── app.js                 # Point d'entrée de l'application
├── src/
│   ├── db/
│   │   ├── sequelize.js   # Configuration Sequelize
│   │   └── mock-cars.js   # Données de test
│   ├── models/
│   │   └── car.js         # Modèle Sequelize Car
│   └── routes/
│       ├── findAllCars.js # GET /api/cars
│       ├── findCarByPk.js # GET /api/cars/:id
│       ├── createCar.js   # POST /api/cars
│       ├── updateCar.js   # PUT /api/cars/:id
│       └── deleteCar.js   # DELETE /api/cars/:id
```

## ✅ Fonctionnalités

- ✅ API REST complète (CRUD)
- ✅ Validation des données
- ✅ Gestion d'erreurs robuste
- ✅ Codes de statut HTTP appropriés
- ✅ Logging des requêtes
- ✅ Architecture modulaire
- ✅ ORM Sequelize intégré
- ✅ Données de test automatiquement insérées

## 🚦 Tests

L'API peut être testée avec:
- **Postman** ou **Insomnia** pour les tests manuels
- Le navigateur pour les endpoints GET
- URL de base: `http://localhost:3000`

## 🔧 Configuration

La configuration de la base de données se trouve dans `src/db/sequelize.js`:

```javascript
const sequelize = new Sequelize('parc_auto', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});
```

## 📚 Scripts disponibles

- `npm start` - Lance l'application avec nodemon (redémarrage automatique)
- `npm run dev` - Alias pour npm start

## 🤝 Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commit vos changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence ISC.
