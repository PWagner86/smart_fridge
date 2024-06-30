import Clock from "./clock";
import Controlles from "./controlles";
import Weather from "./weather";
import Fridge from "./fridge";

export default class Manager {

    private clock: Clock;
    private controlles : Controlles;
    private weather: Weather;
    private fridge: Fridge;

    constructor(

        private clockText: HTMLHeadingElement,
        private dateText: HTMLHeadingElement,

        ) {

        this.clock = new Clock();
        this.controlles = new Controlles();
        this.weather = new Weather();
        this.fridge = new Fridge();
    }

    public init() {
        console.log('SmartFridge started...');
        this.clock.showDate(this.clockText, this.dateText);
        this.weather.setWeatherIcon();
        this.controlles.addEventListeners();
        this.fridge.initFridge();
    }
}