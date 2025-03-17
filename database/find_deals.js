const { MongoClient, ServerApiVersion } = require('mongodb');

// Replace with your actual MongoDB password
const uri = "mongodb+srv://alexandreherve92:Kedanherve1634@cluster0.iyu11.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create MongoClient
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
        const dealsCollection = db.collection("deals");
        const salesCollection = db.collection("sales");

        // 1. Find all best discount deals (discount above 30%)
        async function findBestDiscountDeals() {
            const deals = await dealsCollection
                .find({ discount: { $gt: 30 } })
                .sort({ discount: -1 })
                .toArray();
            console.log("Best Discount Deals (above 30%):", deals);
        }

        // 2. Find all most commented deals (more than 10 comments)
        async function findMostCommentedDeals() {
            const deals = await dealsCollection
                .find({ comments: { $gt: 10 } })
                .sort({ comments: -1 })
                .toArray();
            console.log("Most Commented Deals (more than 10 comments):", deals);
        }

        // 3. Find all deals sorted by price (ascending)
        async function findDealsSortedByPrice() {
            const deals = await dealsCollection.find().sort({ price: 1 }).toArray();
            console.log("Deals Sorted by Price:", deals);
        }

        // 4. Find all deals sorted by date (most recent first)
        async function findDealsSortedByDate() {
            const deals = await dealsCollection.find().sort({ date: -1 }).toArray();
            console.log("Deals Sorted by Date:", deals);
        }

        // 5. Find all sales for a given LEGO set ID
        async function findSalesByLegoSetId(legoSetId) {
            const sales = await salesCollection.find({ legoSetId }).toArray();
            console.log(`Sales for LEGO set ${legoSetId}:`, sales);
        }

        // 6. Find all sales scraped less than 3 weeks ago
        async function findRecentSales() {
            const threeWeeksAgo = new Date();
            threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);

            const sales = await salesCollection.find({ scrapedDate: { $gte: threeWeeksAgo } }).toArray();
            console.log("Sales Scraped in the Last 3 Weeks:", sales);
        }

        // Run all queries
        await findBestDiscountDeals();
        await findMostCommentedDeals();
        await findDealsSortedByPrice();
        await findDealsSortedByDate();
        await findSalesByLegoSetId("42156");
        await findRecentSales();

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}

run();
