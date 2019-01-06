const mongoClient = require('mongodb').MongoClient;
const assert = require("assert");
const url = "mongodb://127.0.0.1:27017";
const dbname = "conFusion";
const dboper = require('./operations');
mongoClient.connect(url,(err, client)=>{
    console.log(err);
    assert.equal(err,null);
    console.log("db connected to server");
    const db = client.db(dbname);
    const  collection = db.collection('dishes');
    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
    "dishes", (result) => {
        console.log("Insert Document:\n", result.ops);

        dboper.findDocuments(db, "dishes", (docs) => {
            console.log("Found Documents:\n", docs);

            dboper.updateDocument(db, { name: "Vadonut" },
                { description: "Updated Test" }, "dishes",
                (result) => {
                    console.log("Updated Document:\n", result.result);

                    dboper.findDocuments(db, "dishes", (docs) => {
                        console.log("Found Updated Documents:\n", docs);
                        
                        db.dropCollection("dishes", (result) => {
                            console.log("Dropped Collection: ", result);

                            client.close();
                        });
                    });
                });
        });
});
})

