import Clock from "./clock";
import SideMenu from "./sideMenu";
import Weather from "./weather";

export default class Manager {

    private clock: Clock;
    private sideMenu : SideMenu;
    private weather: Weather;

    constructor(

        private clockText: HTMLHeadingElement,
        private dateText: HTMLHeadingElement

        ) {

        this.clock = new Clock();
        this.sideMenu = new SideMenu();
        this.weather = new Weather();
    }

    public init() {
        console.log('SmartFridge started...');
        this.clock.showDate(this.clockText, this.dateText);
        this.weather.setWeatherIcon();
        this.sideMenu.addEventListeners();
    }
}