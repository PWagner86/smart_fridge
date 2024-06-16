export default class Clock {

    constructor() {

    }

    private formater(number: number) {
        if(number < 10) return `0${number}`;
        return `${number}`;
    }

    private getDate() {
        const date: Date = new Date();
        const year: number = date.getFullYear();
        const month: string = this.formater(date.getMonth() + 1);
        const days: string = this.formater(date.getDate());
        const hours: string = this.formater(date.getHours());
        const minutes: string = this.formater(date.getMinutes());
        const seconds: string = this.formater(date.getSeconds());

        return {
            clockText: `${hours}:${minutes}:${seconds}`,
            dateText: `${days}.${month}.${year}`
        };
    }
    
    public showDate(clockElm: HTMLHeadingElement, dateElm: HTMLHeadingElement) {
        clockElm.innerHTML = this.getDate().clockText;
        dateElm.innerHTML = this.getDate().dateText;

        setTimeout(() => this.showDate(clockElm, dateElm), 500);
    }
}