export default class History {

    private historyList: HTMLUListElement;
    private time: HTMLHeadingElement;
    private date: HTMLHeadingElement;

    constructor() {
        this.historyList = document.querySelector('[data-history-list]') as HTMLUListElement;
        this.time = document.querySelector('[data-time]') as HTMLHeadingElement;
        this.date = document.querySelector('[data-date]') as HTMLHeadingElement;
    }

    public addToFridge(item: string) {
        const li: HTMLLIElement = document.createElement('li');
        li.classList.add('history-list-item');
        li.classList.add('history-list-item-in');
        li.innerHTML = `<span>${item}:</span><i class="fa-solid fa-arrow-left"></i><span>${this.date.innerText} um ${this.time.innerText}</span>`;
        this.historyList.append(li);
    }

    public removeFromFridge(item: string) {
        const li: HTMLLIElement = document.createElement('li');
        li.classList.add('history-list-item');
        li.classList.add('history-list-item-out');
        li.innerHTML = `<span>${item}:</span><i class="fa-solid fa-arrow-right"></i><span>${this.date.innerText} um ${this.time.innerText}</span>`;
        this.historyList.append(li);
    }
}