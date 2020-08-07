import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import axios from 'axios';

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
    this.router.navigate(
      ['/success/', this.showNow.cardid, this.inputvalue]
      );

  }
  ngOnInit(): void {
    axios.get('assets/mockdata.json').then(res => {
      console.log(res.data);
      this.cardInfo = res.data;
      this.showNow = this.cardInfo[0];
      this.load = true;
    });
  }

}
