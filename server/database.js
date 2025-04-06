import { MongoClient } from 'mongodb';
import { readdir, readFile } from 'fs/promises';
import path from 'path';

const MONGODB_URI =
    'mongodb+srv://alexandreherve92:uVmg6NFSCKJKOsWG@cluster0.iyu11.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const MONGODB_DB_NAME = 'Lego';

// Connexion à MongoDB
async function connectToDatabase() {
    try {
        const client = await MongoClient.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connexion MongoDB réussie');
        const db = client.db(MONGODB_DB_NAME);
        return { db, client };
    } catch (error) {
        console.error('❌ Erreur connexion MongoDB:', error);
        throw error;
    }
}

// Insertion du fichier deals.json
async function insertDeals(db) {
    try {
        const rawData = await readFile('./files/deals.json', 'utf8');
        const data = JSON.parse(rawData);
        const collection = db.collection('deals');

        const result = Array.isArray(data)
            ? await collection.insertMany(data)
            : await collection.insertOne(data);

        console.log(
            `✅ ${Array.isArray(data) ? result.insertedCount + ' deals' : '1 deal'} inséré(s) depuis deals.json`
        );
    } catch (error) {
        console.error('❌ Erreur lors de l\'insertion de deals.json:', error);
    }
}

// Insertion des fichiers Vdeals_*.json
async function insertVintedDeals(db) {
    try {
        const dir = path.resolve('.', 'files');
        const files = await readdir(dir);
        const jsonFiles = files.filter(
            (file) => file.startsWith('Vdeals_') && file.endsWith('.json')
        );

        const collection = db.collection('vintedDeals');

        for (const file of jsonFiles) {
            try {
                const content = await readFile(path.join(dir, file), 'utf8');
                const data = JSON.parse(content);

                const result = Array.isArray(data)
                    ? await collection.insertMany(data)
                    : await collection.insertOne(data);

                console.log(
                    `✅ ${Array.isArray(data) ? result.insertedCount + ' deals' : '1 deal'} inséré(s) depuis ${file}`
                );
            } catch (error) {
                console.error(`❌ Erreur dans le fichier ${file}:`, error);
            }
        }
    } catch (error) {
        console.error('❌ Erreur lors de la lecture des fichiers Vdeals_', error);
    }
}

// Requête d'un deal spécifique par setId
async function findSpecificDeal(db, setId = '10369') {
    try {
        const deal = await db.collection('deals').findOne({ setId });

        if (deal) {
            console.log(`🔗 Lien du deal ${setId} : ${deal.link}`);
        } else {
            console.log(`ℹ️ Aucun deal trouvé avec setId: ${setId}`);
        }
    } catch (error) {
        console.error(`❌ Erreur lors de la recherche du deal ${setId}:`, error);
    }
}

// Fonction principale
async function main() {
    const { db, client } = await connectToDatabase();

    await insertDeals(db);
    await insertVintedDeals(db);
    await findSpecificDeal(db, '10369');

    try {
        await client.close();
        console.log('✅ Connexion MongoDB fermée');
    } catch (error) {
        console.error('❌ Erreur fermeture MongoDB:', error);
    }
}

main();
