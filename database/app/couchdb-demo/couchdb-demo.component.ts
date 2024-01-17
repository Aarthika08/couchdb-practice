import { Component,OnInit } from '@angular/core';

import { CouchDbService } from '../couchdb.service';
@Component({
  selector: 'app-couchdb-demo',
  template: `
  <button (click)="createDatabase()">Create Database</button>
  <button (click)="createDocument()">Create Document</button>
  <button (click)="getDocument()">Get Document</button>
  <button (click)="createView()">Create View</button>
  <button (click)="showDocument()">SHOW</button>

  <button (click)="listDocuments()">LIST</button>
  <button (click)="updateDocument()">UPDATE</button>
  <button (click)="filterDocuments()">FILTER</button>
 


`,
})
export class CouchdbDemoComponent implements OnInit {
  private generatedDocumentId: string = '';

  constructor(private CouchDbService: CouchDbService) {}

  ngOnInit(): void {}

  createDatabase(): void {
    this.CouchDbService.createDatabase('cruddatabase').subscribe(
      (response) => console.log('Database created:', response),
      (error) => console.error('Error creating database:', error)
    );
  }

  createDocument(): void {
    const document = { key: 'value' };
    this.CouchDbService.createDocument('cruddatabase', document).subscribe(
      (response) => {
        console.log('Document created:', response);
        this.generatedDocumentId = this.CouchDbService.getGeneratedDocumentId(response);
      },
      (error) => console.error('Error creating document:', error)
    );
  }

  getDocument(): void {
    if (!this.generatedDocumentId) {
      console.error('Please create a document first.');
      return;
    }

    this.CouchDbService.getDocument('cruddatabase', this.generatedDocumentId).subscribe(
      (response) => console.log('Document retrieved:', response),
      (error) => console.error('Error getting document:', error)
    );
  }


// couchdb-demo.component.ts

// ... (existing code)


createView() {
  const databaseName = 'cruddatabase';
  const designDocumentName = 'mydesign';
  const viewName = 'byFieldName';
  // Example map function
  const mapFunction = 'function (doc) { if (doc.fieldName) { emit(doc.fieldName, doc); } }';
  this.CouchDbService.createView(databaseName, designDocumentName, viewName, mapFunction).subscribe(
    (response) => console.log('Documents retrieved by field name:', response),
    (error) => console.error('Error getting documents by field name:', error)
  );
}

showDocument(): void {
  if (!this.generatedDocumentId) {
    console.error('empty document first.');
    return;
  }
  this.CouchDbService.showDocument('cruddatabase', this.generatedDocumentId).subscribe(
    (response) => console.log('Simplified document retrieved:', response),
    (error) => console.error('Error getting simplified document:', error)
  );
}


listDocuments() {
  const databaseName = 'cruddatabase'; // Replace with your actual database name
  this.CouchDbService.listDocuments(databaseName).subscribe(
    data => {
      // Handle the list of documents here
      console.log('List of documents:', data);
    },
    error => {
      // Handle error
      console.error('Error:', error);
    }
  );
}
// createUpdateQuery(): void {
//   this.CouchDbService.appendValueToArray('cruddatabase', 'this.generatedocumentID', 'newValue').subscribe(
//     (response) => console.log('Document updated with appended value:', response),
//     (error) => console.error('Error updating document with appended value:', error)
//   );
// }

updateDocument() {
  const databaseName = 'cruddatabase'; // Replace with your actual database name
  const documentId = 'yourDocumentId'; // Replace with the ID of the document you want to update
  const newData = {
    // Your updated data goes here
    // For example, if your document has a 'name' field and you want to update it:
    name: 'Updated Name',
    // Add other fields as needed
  };

  this.CouchDbService.updateDocument(databaseName, documentId, newData).subscribe(
    data => {console.log('Document updated successfully:', data);
    },
    error => {  console.error('Error updating document:', error);
    }
  );
}

filterDocuments() {
  const databaseName = 'cruddatabase'; // Replace with your actual database name
  const filterCriteria = {
    // Your filter criteria go here
    // For example, if you want to filter documents where the 'type' field is 'example':
    type: 'example',
    // Add other criteria as needed
  };

  this.CouchDbService.filterDocuments(databaseName, filterCriteria).subscribe(
    data => {
      // Handle the filtered documents response here
      console.log('Filtered documents:', data);
    },
    error => {
      // Handle error
      console.error('Error filtering documents:', error);
    }
  );
}

 

}