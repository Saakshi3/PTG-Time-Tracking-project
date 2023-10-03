import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit{
  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){}

  ngOnInit(): void{
    this.signUpForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required], 
      email: ['', Validators.required],
      worklocation: ['', Validators.required],
      password: ['', Validators.required]
  })
}

onSignUp(){
  if(this.signUpForm.valid){
    //Send the obj to database
    this.auth.signUp(this.signUpForm.value)
    .subscribe({
      next:(res) =>{
        //alert(res.message)
        this.signUpForm.reset();
        this.router.navigate(['login']);
      }, 
      error:(err) =>{
        alert(err?.error.message)
      }    
    })
    
    console.log(this.signUpForm.value)

  }else{
    console.log("Form is invalid")
    alert("your form is invalid")
    //throw error using toaster and with required field
    }
  }
}