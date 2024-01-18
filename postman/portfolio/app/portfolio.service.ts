import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = 'http://localhost:5984/portfolio';
  private adminCredentials = 'admin:admin';

  constructor(private http: HttpClient) { }

  // Fetch all projects
  getAllProjects(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.adminCredentials),
    });

    return this.http.get(`${this.apiUrl}/_all_docs`, { headers });
  }

  // Add a new project
  addProject(project: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.adminCredentials),
      'Content-Type': 'application/json',
    });

    // Assuming your API expects the project data to be in the 'doc' field
    const data = { doc: project };

    return this.http.post(this.apiUrl, data, { headers });
  }

 
  // updateProject(id: string, project: any): Observable<any> {
  //   const headers = new HttpHeaders({
  //     Authorization: 'Basic ' + btoa(this.adminCredentials),
  //     'Content-Type': 'application/json',
  //   });

  //   const url = `${this.apiUrl}/${id}`;
  //   console.log('Update URL:', url);

  //   return this.http.put(url, project, { headers });
  // }



  updateProject(id: string, project: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.adminCredentials),
      'Content-Type': 'application/json',
    });
  
    return this.http.get(`${this.apiUrl}/${id}`, { headers, withCredentials: true }).pipe(
      map((data: any) => {
        const latestRevision = data._rev;
        // Update the document using the latest revision
        return this.http.put(`${this.apiUrl}/${id}`, { ...project, _rev: latestRevision });
      })
    );
  }
  
  deleteProject(id: string, rev: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.adminCredentials),
    });

    const url = `${this.apiUrl}/${id}?rev=${rev}`;
    console.log('Delete URL:', url);

    return this.http.delete(url, { headers });
  }
}
