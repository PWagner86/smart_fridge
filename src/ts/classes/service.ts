export default class Service {

    constructor() {

    }

    public setComponent(comp: HTMLDivElement, compCount: HTMLSpanElement, state: string) {

        switch(state) {
            case '0':
                comp.style.width = '0%';
                comp.style.backgroundColor = '#7eff7e';
                compCount.innerText = '0%'
                break;
            case '25':
                comp.style.width = '25%';
                comp.style.backgroundColor = '#7eff7e';
                compCount.innerText = '25%'
                break;
            case '50':
                comp.style.width = '50%';
                comp.style.backgroundColor = '#ff9900';
                compCount.innerText = '50%'
                break;
            case '75':
                comp.style.width = '75%';
                comp.style.backgroundColor = '#fc2f2f';
                compCount.innerText = '75%'
                break;
            case '100':
                comp.style.width = '100%';
                comp.style.backgroundColor = '#fc2f2f';
                compCount.innerText = '100%'
                break;
        }
    }
}