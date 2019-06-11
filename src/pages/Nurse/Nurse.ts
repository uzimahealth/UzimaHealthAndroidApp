import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Platform, NavController} from 'ionic-angular';

import { PopoverPage } from '../about-popover/about-popover';
import { SpeakerListPage } from '../speaker-list/speaker-list';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-Nurse',
  templateUrl: 'Nurse.html'
})
export class NursePage  {
	 
  public nurse: any ={};
  public nav: NavController;
	public userId=0;

  
 constructor(public popoverCtrl: PopoverController, private http:Http, nav: NavController,public storage: Storage) { 
          this.nav = nav;
		  		  this.getUserId();


  }

       getUserId(): Promise<string> {
    return this.storage.get('userId').then((value) => {
		this.userId=value;
      return value;
    });
  };
  
presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    
popover.present({ ev: event });
	
  }
 

 onNurse() 
{
  let url = "http://13.58.203.26/ecare/webservice/post/request_nurse.php";
  
let body = "county="+this.nurse.county+"&town="+this.nurse.town+"&reason="+this.nurse.reason+"&gender="+this.nurse.gender+"&other="+this.nurse.other+"&firstname="+this.nurse.firstname+"&surname="+this.nurse.surname+"&street="+this.nurse.street+"&building="+this.nurse.building+"&landmark="+this.nurse.landmark+"&floor="+this.nurse.floor+
  "&phone="+this.nurse.phone+"&date="+this.nurse.date+"&patientId="+this.userId;
  
 var headers = new Headers()
  
 headers.append('Content-Type', 'application/x-www-form-urlencoded');

  
let options = new RequestOptions({ headers: headers });
 
 return this.http.post(url, body,options) .map(res => res.json()).subscribe(
            
  data => {
                alert(data.results);
				 this.nav.push(SpeakerListPage, {});

              },
              err => {
                alert("An error occurred");
				this.nav.push(SpeakerListPage, {});
              }
          );
		
    }
   
}