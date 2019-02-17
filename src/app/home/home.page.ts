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
	overallTimer: any = false;
	progress: any = 0;
	minutes: number = 1;
	seconds: any = 30;

	elapsed: any = {
		h: '00',
		m: '00',
		s: '00'
	};

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

	progressTimer() {

		const countDownDate = new Date();

		this.overallTimer = setInterval(() => {
			const now = new Date().getTime();
			const distance = now - countDownDate.getTime();

			// time calculations for hours, minutes and seconds
			this.elapsed.h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			this.elapsed.m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			this.elapsed.s = Math.floor((distance % (1000 * 60)) / 1000);

			// add leading 0
			this.elapsed.h = this.pad(this.elapsed.h, 2);
			this.elapsed.m = this.pad(this.elapsed.m, 2);
			this.elapsed.s = this.pad(this.elapsed.s, 2);
		}, 1000);
	}

	// add leading 0 to timer
	pad(num, size) {

		let s = `${num}`;
		while (s.length < size) s = `0${s}`;
		return s;
	}

	// reset timer
	resetTimer() {

		if (this.timer) clearInterval(this.timer);
		if (!this.overallTimer) this.progressTimer();

		this.timer = false;
		this.percent = 0;
		this.progress = 0;
	}
}
