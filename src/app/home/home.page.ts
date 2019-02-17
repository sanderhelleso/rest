import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	percent: number = 0;
	radius: number = 100;
	fullTime: any = '00:01:30';
	timer: any = false;
	progress: any = 0;
	minutes: number = 1;
	seconds: any = 30;

	// initialize timer
	startTimer() {

		this.resetTimer();

		// get min and sec
		const timeSplit = this.fullTime.split(':');
		this.minutes = timeSplit[1];
		this.seconds = timeSplit[2];

		// get total secs
		const totalSecs = Math.floor(this.minutes * 60) + parseInt(this.seconds);
		this.timer = setInterval(() => {

			// on 100% clear interval
			if (this.percent === this.radius) return clearInterval(this.timer);

			// update timer
			this.percent = Math.floor((this.progress / totalSecs) * 100);
			this.progress++;

			console.log(this.percent);
		}, 1000);

	}

	// reset timer
	resetTimer() {

		if (this.timer) clearInterval(this.timer);

		this.timer = false;
		this.percent = 0;
		this.progress = 0;
	}
}
