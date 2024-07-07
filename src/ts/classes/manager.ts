import Startscreen from "./startScreen";
import Clock from "./clock";
import Controls from "./controls";
import Weather from "./weather";
import Fridge from "./fridge";

export default class Manager {

    private startBtn: HTMLButtonElement;
    private drop: HTMLDivElement;
    private startScreen: Startscreen;
    private clock: Clock;
    private controls : Controls;
    private weather: Weather;
    private fridge: Fridge;

    constructor(
        private clockText: HTMLHeadingElement,
        private dateText: HTMLHeadingElement,
        ) {
        this.startBtn = document.querySelector('[data-start-button]') as HTMLButtonElement;
        this.drop = document.querySelector('[data-start-drop]') as HTMLDivElement;
        this.startScreen = new Startscreen();
        this.clock = new Clock();
        this.controls = new Controls();
        this.weather = new Weather();
        this.fridge = new Fridge();
    }

    public init() {
        this.startBtn.addEventListener('click', () => this.startScreen.startProgramme(this.startBtn, this.drop));
        console.log('SmartFridge started...');
        this.clock.showDate(this.clockText, this.dateText);
        this.weather.setWeatherIcon();
        this.controls.addEventListeners();
        this.fridge.initFridge();
    }
}