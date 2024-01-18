import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  projects: any[] = [];
  //newProject: any = {};
  // updatedProject: any = {}; // Add this line
  newProject: any = { title: '', description: '' };

  updatedProject: any = {};



  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  // Fetch all projects and display them
  loadProjects() {
    console.log('Fetching projects...');
    this.portfolioService.getAllProjects().subscribe(
      (data: any) => {
        console.log('Projects received:', data);
        this.projects = data.rows || [];
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
  // Add a new project
  addProject() {
    this.portfolioService.addProject(this.newProject).subscribe(
      (response) => {
        console.log('Project added successfully:', response);
        this.newProject = {}; // Clear the new project data
        this.loadProjects(); // Reload projects after adding a new one
      },
      (error) => {
        console.error('Error adding project:', error);
      }
    );
  }

  updateProject(id: string,): void {
    console.log('Update Project Data:', id);

    const updatedProject = { _id: id};
    this.portfolioService.updateProject(id, updatedProject).subscribe(() => {
      this.loadProjects();
    });

    this.portfolioService.updateProject(id, updatedProject).subscribe(
      (response) => {
        console.log('Project updated successfully:', response);
        // Handle success
      },
      (error) => {
        console.error('Error updating project:', error);
        // Handle error
      }
    );
    
  }

  deleteProject(id: string, rev: string): void {
    this.portfolioService.deleteProject(id, rev).subscribe(() => {
      this.loadProjects();
    });
  }


}
