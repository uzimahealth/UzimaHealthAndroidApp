import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Headers, Http, RequestOptions} from '@angular/http';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { TabsPage } from '../tabs-page/tabs-page';
import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  public login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(public navCtrl: NavController, private http:Http, public userData: UserData) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {

  let url = "http://13.58.203.26/ecare/webservice/get/login_user.php";
  let body =  "username=" +this.login.username+"&password="+this.login.password;
   var headers = new Headers()
   headers.append('Content-Type', 'application/x-www-form-urlencoded');

  let options = new RequestOptions({ headers: headers });
  return this.http.post(url, body,options) .map(res => res.json()).subscribe(
              data => {
				  if (data === undefined || data.length == 0) {
					alert("username and password is wrong");

				}
				else {
				   // array empty or does not exist
				this.userData.login(this.login.username,data[0].id);
				this.navCtrl.push(TabsPage);
				}

              },
              err => {
                alert("An error occurred");
              }
          );
	  
	
		
		

    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
