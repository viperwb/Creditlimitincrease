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
  /**
   * The cardid of current card that is need to be rendered.
   */
  public currentcard: any;
  /**
   * Format the card number to hide some numbers before rendering.
   */
  public currentFormatedCardNumber: any;
  public increastto: any;
  public cards: any;
  public date: any = new Date().toLocaleString();
  public cardNumberFormat(num) {
    return num.replace(/\s/g, '').replace(/(\d{4})\d+(\d{4})$/, '**** **** **** $2');
  }
  ngOnInit(): void {
    this.activateInfo.params.subscribe((res) => {
      this.currentcard = res.id;
      this.increastto = res.id1;
    });
    axios.get('assets/mockdata.json').then(res => {
      this.cards = res.data;
      this.currentFormatedCardNumber = this.cardNumberFormat(this.cards[this.currentcard - 1].no);
      this.load = true;
    });
    }
}
