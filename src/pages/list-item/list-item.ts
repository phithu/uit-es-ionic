import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'low',
})
@Component({
  selector: 'page-list-item',
  templateUrl: 'list-item.html',
})
export class ListItemPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad ListItemPage');
  }
  public goBack() {
    console.log('Go back');
  }

}
