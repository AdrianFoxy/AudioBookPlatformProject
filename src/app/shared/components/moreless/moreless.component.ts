import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-moreless',
  templateUrl: './moreless.component.html',
  styleUrls: ['./moreless.component.scss']
})
export class MorelessComponent implements OnInit{

  @Input() text!: string;
  @Input() wordLimit!: number;
  @Input() btnStyle: string = "show-more-default";
  showMore: boolean;

  constructor (){
    this.showMore = false;
  }

  ngOnInit(): void {
  }

}
