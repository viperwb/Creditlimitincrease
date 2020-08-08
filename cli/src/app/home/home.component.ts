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
  /**
   * Save all cards info gotten from mock data.
   */
  public cardInfo: any;
  public cardStyleInfo: any;

  /**
   * Save what card info to render on homepage.
   */
  public showNow: any = [];
  public showNowCardStyle: any = [];
  /**
   * If the date is ready to load, set load to true.
   */
  public load: any = false;
  /**
   * This is the value of Increase Limit To input.
   */
  public inputValue: any = '';
  /**
   * This is to save the value of Increase Limit To input before formating.
   */
  public inputValueBeforeBlur: any = '';
  /**
   * Set the default value of dropdown to the first card.
   */
  public selectedOption: any = '1';
  /**
   * When dropdown list value is changed, set the next card info to display.
   * Also reset the input to ''.
   */
  public cardNumberAfterFormat: any;
  public onSelectChange: any =  (data) => {
    this.showNow = this.cardInfo[data.value - 1];
    this.cardNumberAfterFormat = this.cardNumberFormat(this.cardInfo[data.value - 1].no);
    this.showNowCardStyle = this.cardStyleInfo[data.value - 1];
    this.inputValue = '';
  }
  /**
   * When the submit button is pressed, fire this method.
   */
  public submit: any = () => {
    let value = this.inputValue;
    if (this.inputValueBeforeBlur !== '') {
      value = this.inputValueBeforeBlur;
    }
    if (value === '') {
      alert('Please enter amount of Increase Limit To.');
      return;
    }
    if (value < this.showNow.limit || value > this.showNow.max) {
      alert(
        'Please enter amount of Increase Limit To greater than  or equal current limit: '
        + this.showNow.limit
        + ' and smaller than or equal current max limit: '
        + this.showNow.max
        );
      return;
    }
    // Get two mockdatas concluding card information.
    const getCardId = axios.get('assets/mockdata.json');
    const getCardStyle = axios.get('assets/mockdatacardstyle.json');
    // Use forkJoin to group two data requests.
    forkJoin([getCardId, getCardStyle])
      .subscribe(res => {
        if (res[0].data.length > 0 && res[1].data.length > 0) {
          // Make sure both mockdatas are able to be gotton, then can forward to success page.
            this.router.navigate(
              ['/success/', this.showNow.cardid, this.inputValue]
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
  /**
   * If the input is on blur, than format the currency.
   */
  public blurmoneyformat() {
    // save the input value before blur for validation use.
    this.inputValueBeforeBlur = this.inputValue;
    this.inputValue = (this.inputValue).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  public cardNumberFormat(num) {
    return num.replace(/\s/g, '').replace(/(\d{4})\d+(\d{4})$/, '**** **** **** $2');
  }
  ngOnInit(): void {
    axios.get('assets/mockdata.json').then(res => {
      this.cardInfo = res.data;
      this.showNow = this.cardInfo[0];
      this.cardNumberAfterFormat = this.cardNumberFormat(this.cardInfo[0].no);
      this.load = true;
    });
    axios.get('assets/mockdatacardstyle.json').then(res => {
      this.cardStyleInfo = res.data;
      this.showNowCardStyle = this.cardStyleInfo[0];
    });
  }

}
