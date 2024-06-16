import Clock from "./clock";
import SideMenu from "./sideMenu";
export default class Manager {

    private clock: Clock;
    private sideMenu : SideMenu;

    constructor(

        private clockText: HTMLHeadingElement,
        private dateText: HTMLHeadingElement

        ) {

        this.clock = new Clock();
        this.sideMenu = new SideMenu();
    }

    public init() {
        console.log('SmartFridge started...');
        this.clock.showDate(this.clockText, this.dateText);
        this.sideMenu.addEventListeners();
    }
}