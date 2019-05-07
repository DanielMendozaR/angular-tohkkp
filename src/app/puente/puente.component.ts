import {
  Component, Input, ElementRef, OnInit, ViewChild
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'

@Component({
  selector: 'app-puente',
  templateUrl: './puente.component.html',
  styleUrls: ['./puente.component.css']
})
export class PuenteComponent implements OnInit {

  mousedown$: any;
  x: number;
  y: number;
  x2: number;
  y2: number;

  @ViewChild('canvas') public canvas: ElementRef;

  @Input() public width = 200;
  @Input() public height = 150;

  constructor(private _el: ElementRef) { }  

  ngOnInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.mousedown$ = fromEvent(this._el.nativeElement, 'mousedown');
    this.mousedown$ = fromEvent(this._el.nativeElement, 'mousedown');
    this.mousedown$.subscribe((e) => {
      this.x2 = e.x;
      this.y2 = e.y;
    })

    canvasEl.width = this.width;
    canvasEl.height = this.height;
    
    var canvas = <HTMLCanvasElement> document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    //img.src = "https://user-images.githubusercontent.com/263237/36633897-d3237f2e-19ad-11e8-960a-daaf5ca3088a.png";
    img.src = 'fondo.png'
    img.onload = function(){
      ctx.drawImage(img, 0, 0);
    }
  
    var myImage = new Image(100, 200);
    myImage.src = 'fondo.png';
    console.log(myImage);

    this.capturePosition(canvasEl);
  }

  private capturePosition(canvasEl: HTMLCanvasElement) {
    const rect = canvasEl.getBoundingClientRect();
    this.mousedown$ = fromEvent(canvasEl, 'mousedown');
        this.mousedown$.subscribe((e) => {
          this.x = e.x - rect.left;
          console.log('x: ' + this.x);
          this.y = e.y - rect.top;
          console.log('y: ' + this.y);
        })  
  }

}