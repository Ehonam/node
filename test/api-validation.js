// Simple test de validation pour vérifier que l'API fonctionne
// Exécuter avec: node test/api-validation.js

const http = require('http');

const baseUrl = 'http://localhost:3000';

// Fonction helper pour faire des requêtes HTTP
function makeRequest(path, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, baseUrl);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    resolve({ status: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, data: body });
                }
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.end();
    });
}

// Tests de validation
async function runValidationTests() {
    console.log('🧪 Démarrage des tests de validation API...\n');

    try {
        // Test 1: Vérifier que le serveur répond
        console.log('Test 1: Vérification de la connexion au serveur...');
        const homeResponse = await makeRequest('/');
        if (homeResponse.status === 200) {
            console.log('✅ Serveur accessible\n');
        } else {
            console.log('❌ Serveur non accessible\n');
            return false;
        }

        // Test 2: Récupérer toutes les voitures
        console.log('Test 2: Récupération de toutes les voitures...');
        const allCarsResponse = await makeRequest('/api/cars');
        if (allCarsResponse.status === 200 && allCarsResponse.data.data) {
            console.log(`✅ ${allCarsResponse.data.data.length} voitures récupérées\n`);
        } else {
            console.log('❌ Erreur lors de la récupération des voitures\n');
            return false;
        }

        // Test 3: Récupérer une voiture par ID
        console.log('Test 3: Récupération d\'une voiture par ID...');
        const singleCarResponse = await makeRequest('/api/cars/1');
        if (singleCarResponse.status === 200 && singleCarResponse.data.data) {
            console.log(`✅ Voiture récupérée: ${singleCarResponse.data.data.name}\n`);
        } else {
            console.log('❌ Erreur lors de la récupération de la voiture par ID\n');
            return false;
        }

        // Test 4: Créer une nouvelle voiture
        console.log('Test 4: Création d\'une nouvelle voiture...');
        const newCarData = {
            name: 'Voiture de Test',
            brand: 'Test Brand',
            year: 2023,
            image: 'https://example.com/test.jpg',
            assignedTo: ['Test User']
        };
        const createResponse = await makeRequest('/api/cars', 'POST', newCarData);
        if (createResponse.status === 201 && createResponse.data.data) {
            console.log(`✅ Voiture créée: ${createResponse.data.data.name}\n`);
        } else {
            console.log('❌ Erreur lors de la création de la voiture\n');
            return false;
        }

        // Test 5: Tester une route inexistante (404)
        console.log('Test 5: Test d\'une route inexistante...');
        const notFoundResponse = await makeRequest('/api/nonexistent');
        if (notFoundResponse.status === 404) {
            console.log('✅ Gestion 404 fonctionnelle\n');
        } else {
            console.log('❌ Gestion 404 non fonctionnelle\n');
            return false;
        }

        console.log('🎉 Tous les tests sont passés avec succès !');
        console.log('📋 Votre API est complètement fonctionnelle.');
        return true;

    } catch (error) {
        console.log('❌ Erreur lors des tests:', error.message);
        console.log('\n🔧 Assurez-vous que:');
        console.log('   1. Le serveur est démarré (npm start)');
        console.log('   2. La base de données est configurée');
        console.log('   3. Le port 3000 est libre');
        return false;
    }
}

// Exécuter les tests
if (require.main === module) {
    runValidationTests().then((success) => {
        process.exit(success ? 0 : 1);
    });
}

module.exports = { runValidationTests };
