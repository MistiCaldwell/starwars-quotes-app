
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
const connectionString = "mongodb+srv://wontonzero:JammieTyme95!!@cluster0.gpzvxky.mongodb.net/?retryWrites=true&w=majority"


MongoClient.connect(connectionString, {
    useUnifiedTopology: true
})
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('star-wars-quote')
        const quotesCollection = db.collection('quotes')
        app.set('view engine', 'ejs')


        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(express.static('public'))
        app.use(bodyParser.json())

        app.get('/', (request, response) => {
            quotesCollection.find().toArray()
                .then(results => {
                    response.render('index.ejs', { quotes: results })
                })
                .catch(error => console.error(error))
        })

        app.post('/quotes', (request, response) => {
            quotesCollection.insertOne(request.body)
                .then(result => {
                    response.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.put('/quotes', (request, response) => {
            quotesCollection.findOneAndUpdate(
                { name: 'Yoda' },
                {
                    $set: {
                        name: request.body.name,
                        quote: request.body.quote
                    }
                },
                {
                    upsert: true
                }
            )
                .then(result => {
                    console.log(result)
                    response.json('Success')
                })
                .catch(error => console.error(error))
        })

        app.delete('/quotes', (request, response) => {
            quotesCollection.deleteOne(
                { name: request.body.name }
            )
                .then(result => {
                    if (result.deletedCount === 0) {
                        return response.json('No quote to delete')
                    }
                    response.json(`Deleted Darth Vadar's quote`)
                })
                .catch(error => console.error(error))
        })

        app.listen(3000, function () {
            console.log('listening on 3000')
        })

    })
    .catch(error => console.error(error))


