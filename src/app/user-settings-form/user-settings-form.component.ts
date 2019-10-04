import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { DataService } from '../data/data.service';
import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  originalUserSettings: UserSettings ={
    name: null,
    emailOffers: null,
    interfaceStyle: null,
    subscriptionType: null,
    notes: null
  };

  userSettings: UserSettings ={ ...this.originalUserSettings };
  postError = false;
  postErrorMessage = '';
  subscriptionTypes: Observable<string[]>

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
  }

  onHttpError(errorResponse: any) {
    console.log('Error: ', errorResponse)
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage
  }

  onSubmit(form: NgForm) {
    console.log('in onSubmit: ', form.valid)

    if (form.valid) {
      this.dataService.postUserSettings(this.userSettings).subscribe(
        result => console.log('Success: ', result),
        error => this.onHttpError(error)
    );}
  }

  onBlur(field: NgModel){
     
  }

}
