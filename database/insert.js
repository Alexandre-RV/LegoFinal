const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');

// Replace with your actual MongoDB password
const uri = "mongodb+srv://alexandreherve92:Kedanherve1634@cluster0.iyu11.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("yCluster0"); // Replace with your database name
        const collection = db.collection("deals");

        // Read JSON files
        const dealsData = JSON.parse(fs.readFileSync("deals.json", "utf-8"));
        const dealsVintedData = JSON.parse(fs.readFileSync("dealsvinted.json", "utf-8"));

        // Merge both JSON arrays
        const allDeals = [...dealsData, ...dealsVintedData];

        // Insert into MongoDB
        const result = await collection.insertMany(allDeals);
        console.log(`${result.insertedCount} documents inserted`);

    } catch (err) {
        console.error("Error inserting data:", err);
    } finally {
        await client.close();
    }
}

run();
