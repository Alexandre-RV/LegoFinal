const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./database');

const PORT = 8092;
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.options('*', cors());

// Health check
app.get('/', (req, res) => {
    res.send({ ack: true });
});

connectToDatabase()
    .then(async ({ db, client }) => {
        console.log('✅ Connected to MongoDB');

        // Routes
        app.get('/deals', async (req, res) => {
            try {
                const deals = await db.collection('deals').find().toArray();
                res.json(deals);
            } catch (err) {
                console.error('❌ Failed to retrieve deals:', err);
                res.status(500).json({ error: 'Server error' });
            }
        });

        app.get('/deals/search', async (req, res) => {
            try {
                const {
                    limit = 12,
                    price,
                    filterBy,
                    setId,
                    sortPrice
                } = req.query;

                const parsedLimit = parseInt(limit);
                const parsedPrice = price ? parseFloat(price) : null;

                const query = {};
                if (setId) query.setId = setId;
                if (parsedPrice !== null) query.price = { $lte: parsedPrice };

                let sort = { price: 1 }; // Default sort

                switch (filterBy) {
                    case 'best-discount':
                        sort = { discount: -1 };
                        break;
                    case 'hottest':
                        sort = { temperature: -1 };
                        break;
                    default:
                        if (sortPrice === 'desc') sort = { price: -1 };
                        break;
                }

                const deals = await db.collection('deals')
                    .find(query)
                    .sort(sort)
                    .limit(parsedLimit)
                    .toArray();

                res.json(deals);
            } catch (err) {
                console.error('❌ Failed to search deals:', err);
                res.status(500).json({ error: 'Server error' });
            }
        });

        app.get('/sales', async (req, res) => {
            try {
                const sales = await db.collection('vintedDeals').find().toArray();
                res.json(sales);
            } catch (err) {
                console.error('❌ Failed to retrieve sales:', err);
                res.status(500).json({ error: 'Server error' });
            }
        });

        app.get('/sales/search', async (req, res) => {
            try {
                const {
                    limit = 12,
                    id,
                    sortPrice = 'asc'
                } = req.query;

                const parsedLimit = parseInt(limit);

                const query = {};
                if (id) query.id = id;

                const sort = {
                    price: sortPrice === 'desc' ? -1 : 1
                };

                const sales = await db.collection('vintedDeals')
                    .find(query)
                    .sort(sort)
                    .limit(parsedLimit)
                    .toArray();

                res.json(sales);
            } catch (err) {
                console.error('❌ Failed to search sales:', err);
                res.status(500).json({ error: 'Server error' });
            }
        });

        // Gracefully close MongoDB connection
        process.on('SIGINT', async () => {
            await client.close();
            console.log('👋 MongoDB connection closed.');
            process.exit(0);
        });
    })
    .catch(err => {
        console.error('❌ Failed to connect to MongoDB:', err);
    });

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
