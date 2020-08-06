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

  public showNow: any;
  public load: any = false;
  public inputvalue: any;

  public onSelectChange: any =  (data) => {
    this.showNow = this.cardInfo[data.value - 1];
    this.inputvalue = '';
  }
  public submit: any = (e) => {
    console.log(e);
    // this.router.navigate(['/success/' + this.showNow.cardId + '/' + this.inputvalue]);
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
