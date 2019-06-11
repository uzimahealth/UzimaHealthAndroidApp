import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Platform, NavController} from 'ionic-angular';

import { PopoverPage } from '../about-popover/about-popover';
import { SpeakerListPage } from '../speaker-list/speaker-list';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-Measurements',
  templateUrl: 'Measurements.html'
})
export class MeasurementsPage {
public measurements: any ={};
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
 

 onMeasurements() 
{
  let url = "http://13.58.203.26/ecare/webservice/post/request_measurements.php";
  
let body = "illness="+this.measurements.illness+"&pressure_level="+this.measurements.pressure_level+"&sugar_level="+this.measurements.sugar_level+"&heart_rate="+this.measurements.heart_rate+"&email="+"&date_submitted="
+this.measurements.date_submitted+"&patientId="+this.userId;
  
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