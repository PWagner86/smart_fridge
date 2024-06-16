import Clock from "./clock";
export default class Manager {

    private clock: Clock;

    constructor(

        private clockText: HTMLHeadingElement,
        private dateText: HTMLHeadingElement

        ) {

        this.clock= new Clock();
    }

    public init() {
        console.log('SmartFridge started...');
        this.clock.showDate(this.clockText, this.dateText)
    }
}