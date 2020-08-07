import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import axios from 'axios';
import { forkJoin, throwError} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  public cardInfo: any;

  public showNow: any = [];
  public load: any = false;
  public inputvalue: any = '';

  public onSelectChange: any =  (data) => {
    this.showNow = this.cardInfo[data.value - 1];
    this.inputvalue = '';
  }
  public submit: any = () => {
    if (this.inputvalue === '') {
      alert('Please enter amount of Increase Limit To.');
      return;
    }
    if (this.inputvalue < this.showNow.limit || this.inputvalue > this.showNow.max) {
      alert(
        'Please enter amount of Increase Limit To greater than  or equal current limit: '
        + this.showNow.limit
        + ' and smaller than or equal current max limit: '
        + this.showNow.max
        );
      return;
    }
    const getCardId = axios.get('assets/mockdata.json');
    const getCardStyle = axios.get('assets/mockdatacardstyle.json');
    // Use forkJoin to group two data requests.
    forkJoin([getCardId, getCardStyle])
      .subscribe(res => {
        if (res[0].data.length > 0 && res[1].data.length > 0) {
          // Make sure both mockdatas are able to be gotton, then can forward to success page.
            this.router.navigate(
              ['/success/', this.showNow.cardid, this.inputvalue]
            );
        } else {
          // If any data is empty, navigate to error page.
          this.router.navigate(
            ['/error']
          );
        }
      },
      (error) => {
        // If there is error in the process of getting two mockdatas, navigate to error page.
        this.router.navigate(
          ['/error']
        );
      }
      );
  }
  ngOnInit(): void {
    axios.get('assets/mockdata.json').then(res => {
      this.cardInfo = res.data;
      this.showNow = this.cardInfo[0];
      this.load = true;
    });
  }

}
