import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../about-popover/about-popover';
import {Headers, Http, RequestOptions} from '@angular/http';


@Component({
  selector: 'page-response',
  templateUrl: 'Response.html'
})
export class ResponsePage {

public responseitems: any = [];

  constructor(public popoverCtrl: PopoverController,private http:Http) { 
   this.http.get('http://13.58.203.26/ecare/webservice/get/getresponse.php').map(res => res.json()).subscribe(data => {
        this.responseitems = data;
    });
  
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }
}
