import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
    loginForm!: FormGroup;
    constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){}
    ngOnInit(): void{
      this.loginForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    })
  }

  onLogin(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      //Send the obj to database
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res) =>{
          //alert(res.message)
          this.loginForm.reset();
          this.router.navigate(['timesheet'])
        }, 
        error:(err) =>{
          alert(err?.error.message)
        }    
      })
      
    }else{
      console.log("Form is invalid")
      alert("your form is invalid")
      //throw error using toaster and with required field
    }
  }
}