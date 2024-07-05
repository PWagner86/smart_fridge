import Clock from "./clock";
import Controls from "./controls";
import Weather from "./weather";
import Fridge from "./fridge";

export default class Manager {

    private clock: Clock;
    private controls : Controls;
    private weather: Weather;
    private fridge: Fridge;

    constructor(

        private clockText: HTMLHeadingElement,
        private dateText: HTMLHeadingElement,

        ) {

        this.clock = new Clock();
        this.controls = new Controls();
        this.weather = new Weather();
        this.fridge = new Fridge();
    }

    public init() {
        console.log('SmartFridge started...');
        this.clock.showDate(this.clockText, this.dateText);
        this.weather.setWeatherIcon();
        this.controls.addEventListeners();
        this.fridge.initFridge();
    }
}