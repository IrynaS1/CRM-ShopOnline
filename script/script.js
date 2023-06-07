'use strict';

const dataElement = document.querySelectorAll('[data-timer-deadline]');

if (dataElement.length === 1) {
	const timerBlock = document.querySelector('.timer');

	const timerDiv = document.createElement('div');
	timerDiv.classList.add('timer__block');
	timerBlock.prepend(timerDiv);

	const timerTextDiv = document.createElement('div');
	timerTextDiv.classList.add('timer__text');
	timerDiv.prepend(timerTextDiv);

	const timerTextP = document.createElement('p');
	timerTextP.classList.add('timer__text-size');
	timerTextP.textContent = 'До конца акции:';
	timerTextDiv.prepend(timerTextP);

	const timerTermDiv = document.createElement('div');
	timerTermDiv.classList.add('timer-term');
	timerTextDiv.after(timerTermDiv);

	const timerDaysDiv = document.createElement('div');
	timerDaysDiv.classList.add('timer-term__days');
	timerTermDiv.prepend(timerDaysDiv);

	const timerNumberDays = document.createElement('span');
	timerNumberDays.classList.add('timer-term__number', 'timer-term__number_days');
	timerNumberDays.textContent = '3';
	timerDaysDiv.prepend(timerNumberDays);

	const timerTextDays = document.createElement('span');
	timerTextDays.classList.add('timer-term__text', 'timer-term__text_days');
	timerTextDays.textContent = 'дня';
	timerNumberDays.after(timerTextDays);

	const timerHoursDiv = document.createElement('div');
	timerHoursDiv.classList.add('timer-term__hours');
	timerDaysDiv.after(timerHoursDiv);

	const timerNumberHours = document.createElement('span');
	timerNumberHours.classList.add('timer-term__number', 'timer-term__number_hours');
	timerNumberHours.textContent = '8';
	timerHoursDiv.append(timerNumberHours);

	const timerTextHours = document.createElement('span');
	timerTextHours.classList.add('timer-term__text', 'timer-term__text_hours');
	timerTextHours.textContent = 'часов';
	timerNumberHours.after(timerTextHours);

	const timerMinutesDiv = document.createElement('div');
	timerMinutesDiv.classList.add('timer-term__minutes');
	timerHoursDiv.after(timerMinutesDiv);

	const timerNumberMinutes = document.createElement('span');
	timerNumberMinutes.classList.add('timer-term__number', 'timer-term__number_minutes');
	timerNumberMinutes.textContent = '43';
	timerMinutesDiv.append(timerNumberMinutes);

	const timerTextMinutes = document.createElement('span');
	timerTextMinutes.classList.add('timer-term__text', 'timer-term__text_minutes');
	timerTextMinutes.textContent = 'минуты';
	timerNumberMinutes.after(timerTextMinutes);
} else {
	console.log('Дедлайна нет');
}

const timer = (deadline) => {
	const timerDays = document.querySelector('.timer-term__number_days');

	const timerHours = document.querySelector('.timer-term__number_hours');

	const timerMinutes = document.querySelector('.timer-term__number_minutes');

	const getTimeRemaining = () => {
		const dateStop = new Date(deadline).getTime();

		const dateNow = Date.now();

		const timeRemaining = dateStop - dateNow;

		const minutes = (Math.floor(timeRemaining / 1000 / 60 % 60));

		const hours = (Math.floor(timeRemaining / 1000 / 60 / 60 % 24));

		const days = (Math.floor(timeRemaining / 1000 / 60 / 60 / 24));

		return {
			timeRemaining,
			minutes,
			hours,
			days,
		};
	};

	const start = () => {
		const timer = getTimeRemaining();

		timerDays.textContent = timer.days;

		if (timer.days < 10) {
			timerDays.textContent = '0' + timer.days;
		}

		const daysWord = document.querySelector('.timer-term__text_days');

		let daysContent = (timer.days === 1 || (timer.days % 10 === 1)) ? 'день' :
			(timer.days > 10 && timer.days < 20) ? 'дней' :
				((timer.days % 10 === 2) || (timer.days % 10 === 3)
					|| (timer.days % 10 === 4)) ? 'дня' :
					'дней';

		daysWord.textContent = daysContent;

		timerHours.textContent = timer.hours;

		if (timer.hours < 10) {
			timerHours.textContent = '0' + timer.hours;
		}

		const hoursWord = document.querySelector('.timer-term__text_hours');

		let hoursContent = (timer.hours === 1 || (timer.hours % 10 === 1)) ? 'час' :
			(timer.hours > 10 && timer.hours < 20) ? 'часов' :
				((timer.hours % 10 === 2) || (timer.hours % 10 === 3)
					|| (timer.hours % 10 === 4)) ? 'часа' :
					'часов';

		hoursWord.textContent = hoursContent;

		timerMinutes.textContent = timer.minutes;

		if (timer.minutes < 10) {
			timerMinutes.textContent = '0' + timer.minutes;
		}

		const minutesWord = document.querySelector('.timer-term__text_minutes');

		let minutesContent = (timer.minutes === 1 || (timer.minutes % 10 === 1)) ? 'минута' :
			(timer.minutes > 10 && timer.minutes < 20) ? 'минут' :
				((timer.minutes % 10 === 2) || (timer.minutes % 10 === 3)
					|| (timer.minutes % 10 === 4)) ? 'минуты' :
					'минут';

		minutesWord.textContent = minutesContent;

		if (timerDays.textContent === '00') {
			const timerBlock = document.querySelector('.timer__block');
			timerBlock.style.background = 'green';
		} else {
			const timerBlock = document.querySelector('.timer__block');
			timerBlock.style.background = 'red';
		}

		const intervalId = setTimeout(start, 1000);

		if (timer.timeRemaining <= 0) {
			clearTimeout(intervalId);

			timerDays.textContent = '00';
			timerHours.textContent = '00';
			timerMinutes.textContent = '00';

			const timerBlock = document.querySelector('.timer');
			timerBlock.style.display = 'none';
		}
	};

	start();
};

const timerBlock = document.querySelector('.timer');

let deadline = timerBlock.getAttribute('data-timer-deadline');

timer(deadline); 