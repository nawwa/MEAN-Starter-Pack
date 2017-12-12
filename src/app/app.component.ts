import { Component } from '@angular/core';
import { DataService } from './data.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  users: Array<any>;
  user: Object = {};

  constructor(private _dataservice: DataService) {
    this.getUser();
  }

  //Create a function to get the users
  getUser() {
    this._dataservice.getUsers()
    .subscribe((rcv) => {
      this.users = rcv;
    });
  }

  //Function that is going to be called when you submit the form
  postUser() {

   this._dataservice.postUser(this.user)
     .subscribe((rcv) => {
        console.log("Rcv : ", rcv);
        this.getUser(); //Call the get user after we insert one, so the user list is re-generated
    });

  }
}
