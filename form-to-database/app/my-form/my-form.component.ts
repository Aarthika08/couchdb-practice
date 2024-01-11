import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient,HttpHeaders }from '@angular/common/http';
@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent {
myForm:FormGroup;

constructor(private fb: FormBuilder,private http:HttpClient)
{
  this.myForm=this.fb.group({
    name:['',Validators.required],
    age:['',Validators.required],

    // email:['',[Validators.required,Validators.email]],
  //add]
  });
}

// onSubmit()
// {
//   if(this.myForm.valid)
//   {
//     const formData=this.myForm.value;

//      // Send data to CouchDB
//      this.http.post('http://localhost:5984/crud', formData)
//      .subscribe(response => {
//        console.log('Data stored successfully:', response);
//        // You can add further actions here
//      });
//   }
// }
onSubmit() {
  if (this.myForm.valid) {
    const formData = this.myForm.value;

    // Add user credentials
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:admin'),
      'Content-Type': 'application/json',
    });

    // Send data to CouchDB with headers
    this.http.post('http://localhost:5984/crud', formData, { headers })
      .subscribe(
        response => {
          console.log('Data stored successfully:', response);
          // You can add further actions here
        },
        error => {
          console.error('Error storing data:', error);
        }
      );
  }
}


}
