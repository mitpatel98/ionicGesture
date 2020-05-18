import { element } from "protractor";
import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  Renderer2,
} from "@angular/core";
import { Gesture, GestureConfig, createGesture } from "@ionic/core";
import { GestureController } from "@ionic/angular";

@Component({
  selector: "app-swipe-drawer",
  templateUrl: "./swipe-drawer.component.html",
  styleUrls: ["./swipe-drawer.component.scss"],
})
export class SwipeDrawerComponent implements AfterViewInit {
  constructor(
    private gestureCtrl: GestureController,
    public element: ElementRef,
    public renderer: Renderer2
  ) {}
  async ngAfterViewInit() {
    console.log("mit");

    const options: GestureConfig = {
      el: this.element.nativeElement,
      direction: "y",
      gestureName: "swipe-drawer",
      onStart: () => {
        // do something as the gesture begins
        this.renderer.setStyle(
          this.element.nativeElement,
          "transition",
          "none"
        );
      },
      onMove: (ev) => {
        // do something in response to movement
        if (ev.deltaY < 0) {
          this.renderer.setStyle(
            this.element.nativeElement,
            "transform",
            `translateY(${ev.deltaY}px)`
          );
        }
      },
      onEnd: (ev) => {
        this.renderer.setStyle(
          this.element.nativeElement,
          "transition",
          "0.3s ease-out"
        );
        if (ev.deltaY < -200) {
          this.renderer.setStyle(
            this.element.nativeElement,
            "transform",
            `translateY(-450px)`
          );
        } else {
          this.renderer.setStyle(
            this.element.nativeElement,
            "transform",
            `translateY(0px)`
          );
        }
      },
    };

    const gesture: Gesture = await this.gestureCtrl.create(options);

    gesture.enable();
  }

  ngOnInit() {}
}
