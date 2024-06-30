export default class Service {

    private filter: HTMLDivElement;
    private filterCount: HTMLSpanElement;
    private kompressor: HTMLDivElement;
    private kompressorCount: HTMLSpanElement;
    private drossel: HTMLDivElement;
    private drosselCount: HTMLSpanElement;

    constructor() {
        this.filter = document.querySelector('[data-filter]') as HTMLDivElement;
        this.filterCount = document.querySelector('[data-filter-count]') as HTMLSpanElement;
        this.kompressor = document.querySelector('[data-kompressor]') as HTMLDivElement;
        this.kompressorCount = document.querySelector('[data-kompressor-count]') as HTMLSpanElement;
        this.drossel = document.querySelector('[data-drossel]') as HTMLDivElement;
        this.drosselCount = document.querySelector('[data-drossel-count]') as HTMLSpanElement;
    }

    public setFilter(state: string) {

        switch(state) {
            case '0':
                this.filter.style.width = '0%';
                this.filter.style.backgroundColor = '#7eff7e';
                this.filterCount.innerText = '0%'
                break;
            case '25':
                this.filter.style.width = '25%';
                this.filter.style.backgroundColor = '#7eff7e';
                this.filterCount.innerText = '25%'
                break;
            case '50':
                this.filter.style.width = '50%';
                this.filter.style.backgroundColor = '#ff9900';
                this.filterCount.innerText = '50%'
                break;
            case '75':
                this.filter.style.width = '75%';
                this.filter.style.backgroundColor = '#fc2f2f';
                this.filterCount.innerText = '75%'
                break;
            case '100':
                this.filter.style.width = '100%';
                this.filter.style.backgroundColor = '#fc2f2f';
                this.filterCount.innerText = '100%'
                break;
        }
    }

    public setKompressor(state: string) {

        switch(state) {
            case '0':
                this.kompressor.style.width = '0%';
                this.kompressor.style.backgroundColor = '#7eff7e';
                this.kompressorCount.innerText = '0%'
                break;
            case '25':
                this.kompressor.style.width = '25%';
                this.kompressor.style.backgroundColor = '#7eff7e';
                this.kompressorCount.innerText = '25%'
                break;
            case '50':
                this.kompressor.style.width = '50%';
                this.kompressor.style.backgroundColor = '#ff9900';
                this.kompressorCount.innerText = '50%'
                break;
            case '75':
                this.kompressor.style.width = '75%';
                this.kompressor.style.backgroundColor = '#fc2f2f';
                this.kompressorCount.innerText = '75%'
                break;
            case '100':
                this.kompressor.style.width = '100%';
                this.kompressor.style.backgroundColor = '#fc2f2f';
                this.kompressorCount.innerText = '100%'
                break;
        }
    }


    public setDrossel(state: string) {

        switch(state) {
            case '0':
                this.drossel.style.width = '0%';
                this.drossel.style.backgroundColor = '#7eff7e';
                this.drosselCount.innerText = '0%'
                break;
            case '25':
                this.drossel.style.width = '25%';
                this.drossel.style.backgroundColor = '#7eff7e';
                this.drosselCount.innerText = '25%'
                break;
            case '50':
                this.drossel.style.width = '50%';
                this.drossel.style.backgroundColor = '#ff9900';
                this.drosselCount.innerText = '50%'
                break;
            case '75':
                this.drossel.style.width = '75%';
                this.drossel.style.backgroundColor = '#fc2f2f';
                this.drosselCount.innerText = '75%'
                break;
            case '100':
                this.drossel.style.width = '100%';
                this.drossel.style.backgroundColor = '#fc2f2f';
                this.drosselCount.innerText = '100%'
                break;
        }
    }
}