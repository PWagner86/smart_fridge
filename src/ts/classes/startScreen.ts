export default class Startscreen {

    private startScreen: HTMLDivElement;
    private startSound: HTMLAudioElement;
    private letters: Array<HTMLSpanElement>;

    constructor() {
        this.startScreen = document.querySelector('[data-start-screen]') as HTMLDivElement;
        this.startSound = document.querySelector('[data-start-up-sound]') as HTMLAudioElement;
        this.letters = [...document.querySelectorAll('[data-start-letter]')] as Array<HTMLSpanElement>;
    }
    
    public startProgramme( btn: HTMLButtonElement, drop: HTMLDivElement) {
        btn.classList.add('start-vanish');
        drop.classList.add('start-vanish');
        this.startSound.play();
        this.showHideLetters();
        this.vanishScreen();
        this.displayNone();
    }

    private displayNone() {
        setTimeout(() => {
            this.startScreen.classList.add('start-none');
        }, 7500);
    }

    private showHideLetters() {
        const order: Array<number> = [0, 5, 2, 10, 6, 1, 3, 9, 4, 7, 8];
        let interval: number = 200;
        for(let i = 0; i < order.length; i++) {
            const index: number = order[i];
            setTimeout(() => {
                this.letters[index].classList.add('show');
            }, interval)
            interval += 350;
        }
    }

    private vanishScreen() {
        setTimeout(() => {
            this.startScreen.classList.add('start-vanish');
        }, 7000);
    }
}