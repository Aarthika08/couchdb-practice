// couchdb.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CouchDbService {
  private baseUrl = 'http://localhost:5984'; // Assuming CouchDB is running locally
  private adminCredentials = 'admin:admin'; // Replace with your CouchDB admin credentials

  constructor(private http: HttpClient) {}

  createDatabase(databaseName: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(this.adminCredentials)}`,
      'Content-Type': 'application/json',
    });

    return this.http.put(`${this.baseUrl}/${databaseName}`, {}, { headers });
  }

  createDocument(databaseName: string, document: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(this.adminCredentials)}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.baseUrl}/${databaseName}`, document, { headers });
  }

  getDocument(databaseName: string, documentId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(this.adminCredentials)}`,
      'Content-Type': 'application/json',
    });

    return this.http.get(`${this.baseUrl}/${databaseName}/${documentId}`, { headers }).pipe(
      tap(response => console.log('Document retrieved:', response)),
      catchError(error => {
        console.error('Error getting document:', error);
        return throwError(error); // Re-throw the error using throwError
      })
    );
  }

  getGeneratedDocumentId(response: any): string {
    return response.id;
  }

  getDocumentsByFieldName(databaseName: string, fieldName: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(this.adminCredentials)}`,
      'Content-Type': 'application/json',
    });

    return this.http.get(`${this.baseUrl}/${databaseName}/_design/mydesign/_view/byFieldName?key="${fieldName}"`,{headers}).pipe(
      tap(response => console.log('Documents retrieved by field name:', response)),
      catchError(error => {
        console.error('Error getting document:', error);
        return throwError(error); // Re-throw the error using throwError
      })
    );
  }

  // couchdb.service.ts
  createView(databaseName: string, designDocumentName: string, viewName: string, mapFunction: string): Observable<any> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:admin') // Include your CouchDB credentials
    });
    const viewFunction = {
      views: {
        [viewName]: {
          map: mapFunction,
        },
      },
    };

    return this.http.put(`${this.baseUrl}/${databaseName}/_design/${designDocumentName}`, viewFunction, { headers }).pipe(
      tap(response => console.log('View created:', response)),
      catchError(error => {
        console.error('Error creating view:', error);
        return throwError(error);
      })
    );
  }



  showDocument(databaseName: string, documentId: string): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:admin')
    });
  
    return this.http.get(`${this.baseUrl}/${databaseName}/${documentId}`, { headers }).pipe(
      tap(response => console.log('Document retrieved:', response)),
      catchError(error => {
        console.error('Error getting document:', error);
        return throwError(error); // Re-throw the error using throwError
      })
    );
  }
  



// couchdb.service.ts

listDocuments(databaseName: string): Observable<any> {
  const headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('admin:admin') // Include your CouchDB credentials
  });

  return this.http.get(`${this.baseUrl}/${databaseName}/_all_docs`, { headers }).pipe(
    tap(response => console.log('Documents retrieved:', response)),
    catchError(error => {
      console.error('Error getting list of documents:', error);
      return throwError(error);
    })
  );
}

// couchdb.service.ts

updateDocument(databaseName: string, documentId: string, newData: any): Observable<any> {
  const headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('admin:admin') // Include your CouchDB credentials
  });

  return this.http.put(`${this.baseUrl}/${databaseName}/${documentId}`, newData, { headers }).pipe(
    tap(response => console.log('Document updated:', response)),
    catchError(error => {
      console.error('Error updating document:', error);
      return throwError(error);
    })
  );
}


// couchdb.service.ts

filterDocuments(databaseName: string, filterCriteria: any): Observable<any> {
  const headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('admin:admin') // Include your CouchDB credentials
  });

  const params = new HttpParams().set('selector', JSON.stringify(filterCriteria));

  return this.http.post(`${this.baseUrl}/${databaseName}/_find`, { selector: filterCriteria }, { headers, params }).pipe(
    tap(response => console.log('Filtered documents:', response)),
    catchError(error => {
      console.error('Error filtering documents:', error);
      return throwError(error);
    })
  );
}

// couchdb.service.ts


}






