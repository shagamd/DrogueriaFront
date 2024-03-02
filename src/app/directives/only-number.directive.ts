import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyNumber]'
})
export class OnlyNumberDirective {
  constructor(private el: ElementRef) { }

  @Input() OnlyNumber: boolean;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent>event;
    // console.log(e);
    if (this.OnlyNumber) {
      if (
        ['Delete', 'Backspace', 'Tab', 'Esc', 'Enter'].indexOf(e.key) !==
        -1 ||
        // Allow: Ctrl+A
        (e.key === 'a' && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+C
        (e.key === 'c' && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+V
        (e.key === 'v' && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+X
        (e.key === 'x' && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+Z
        (e.key === 'z' && (e.ctrlKey || e.metaKey)) ||
        // Allow: home, end, left, right
        e.key === 'Home' ||
        e.key == 'End' ||
        e.key == 'ArrowLeft' ||
        e.key == 'ArrowRight'
      ) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress
      if (
        (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
        (e.keyCode < 96 || e.keyCode > 105)
      ) {
        e.preventDefault();
      }
    }
  }

}
