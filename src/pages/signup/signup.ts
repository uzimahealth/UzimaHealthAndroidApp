import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Headers, Http, RequestOptions} from '@angular/http';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { TabsPage } from '../tabs-page/tabs-page';

import { LoginPage } from '../login/login';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  public signup: UserOptions = { username: '', password: '' };
  submitted = false;
 public signup2: any = {};

  constructor(public navCtrl: NavController, public userData: UserData, private http:Http) {}

  onSignup(form: NgForm) {
	  
  let url = "http://13.58.203.26/ecare/webservice/post/register_user.php";
  let body =  "county=" +this.signup2.county+"&town="+this.signup2.town+"&firstname="+this.signup2.firstname+"&surname="+this.signup2.surname+"&street="+this.signup2.street+"&building="+this.signup2.building+"&landmark="+this.signup2.landmark+
  "&phone="+this.signup2.phone+"&username="+this.signup.username+"&password="+this.signup.password
  +"&email="+this.signup2.email;
   var headers = new Headers()
   headers.append('Content-Type', 'application/x-www-form-urlencoded');

  let options = new RequestOptions({ headers: headers });
  return this.http.post(url, body,options) .map(res => res.json()).subscribe(
              data => {
				this.submitted = true;
                alert(data.results);
				//this.userData.signup(this.signup.username);
				//this.navCtrl.push(TabsPage);
				this.navCtrl.push(LoginPage);


              },
              err => {
                alert("An error occurred");
              }
          );
	  
	  
 
  }
}
