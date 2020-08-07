import {ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(public activateInfo: ActivatedRoute ) {
   }
  public load: any = false;
  public currentcard: any;
  public increastto: any;
  public cards: any;
  public date: any = new Date();

  ngOnInit(): void {
    this.activateInfo.params.subscribe((res) => {
      this.currentcard = res.id;
      this.increastto = res.id1;
    });
    axios.get('assets/mockdata.json').then(res => {
      this.cards = res.data;
      this.load = true;
    });
    /* this.http.get('../mockdata.json').subscribe(res => {
      console.log(res);
    }); */
    }


}
