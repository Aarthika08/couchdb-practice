Certainly! In Fauxton, you can use Mango queries to perform CRUD operations as well. Mango queries are expressed as JSON objects, and you can use the "Mango Query" section in Fauxton to execute these queries. Here are examples for each CRUD operation:

### Create (Insert) Document:

1. Open Fauxton in your web browser.
2. Navigate to your database (e.g., http://localhost:5984/_utils/#database/fruits).
3. Click on the "Mango Query" tab.
4. Use the following Mango query to insert a new document:

   ```json
   {
     "type": "mango",
     "name": "Alphonso",
     "color": "yellow"
   }
   ```

   Click the "Run Query" button.

### Read (Retrieve) Document:

1. Open Fauxton in your web browser.
2. Navigate to your database (e.g., http://localhost:5984/_utils/#database/fruits).
3. Click on the "Mango Query" tab.
4. Use the following Mango query to retrieve a document by ID:

   ```json
   {
     "selector": {
       "_id": "your-document-id"
     }
   }
   ```

   Replace "your-document-id" with the actual ID. Click the "Run Query" button.

### Update (Modify) Document:

1. Open Fauxton in your web browser.
2. Navigate to your database (e.g., http://localhost:5984/_utils/#database/fruits).
3. Click on the "Mango Query" tab.
4. Use the following Mango query to update a document:

   ```json
   {
     "selector": {
       "_id": "your-document-id"
     },
     "update": {
       "$set": {
         "name": "Honey",
         "color": "orange"
       }
     }
   }
   ```

   Replace "your-document-id" with the actual ID. Click the "Run Query" button.

### Delete (Remove) Document:

1. Open Fauxton in your web browser.
2. Navigate to your database (e.g., http://localhost:5984/_utils/#database/fruits).
3. Click on the "Mango Query" tab.
4. Use the following Mango query to delete a document by ID:

   ```json
   {
     "selector": {
       "_id": "your-document-id"
     },
     "fields": ["_id", "_rev"]
   }
   ```

   Replace "your-document-id" with the actual ID. Click the "Run Query" button.

Remember to replace "your-document-id" with the actual document ID in each case. These examples assume that the database contains documents with fields like "type," "name," and "color." Adjust the queries based on the structure of your documents.

codes

CREATE
new document created 
{
 "_id": "69b8477fcb6c0564522a6131a8000ea5",
 "_rev": "1-d079e6d63b9046ff264f777d3980da1e",
 "Name": "John",
 "email": "John@gmail.com",
 "ph.no": 9987897645,
 "address": {
  "street": "24 street",
  "city": "miami",
  "country": "LA"
 }
}

READ

{
   "selector": {
      "_id": "69b8477fcb6c0564522a6131a8000ea5"
   }  
}

UPDATE
{
   "selector": {
      "_id": "69b8477fcb6c0564522a6131a8000ea5"
   },
   "update": {
    "$set": {
      "name": "Honey",
      "color": "orange"
    }}
}

DELETE

{
  "selector": {
    "_id": "your-document-id"
  },
  "fields": ["_id", "_rev"]
}
