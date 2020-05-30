import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getstart-slide',
  templateUrl: './getstart-slide.component.html',
  styleUrls: ['./getstart-slide.component.scss'],
})
export class GetstartSlideComponent implements OnInit {

  slideOpts = {
    initialSlide: 0,
    // slidesPerView: 2,
    // loop: true,
    // centeredSlides: true,
    // spaceBetween: 20,
    // autoplay: true
  };

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  onBtnGetStartedClicked() {
    this.router.navigateByUrl('/menu');
  }

}
