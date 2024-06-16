export default class SideMenu {

    private sideMenu: HTMLElement;
    private openCloseTab: HTMLDivElement;

    constructor() {

        this.sideMenu = document.querySelector('[data-side-menu]') as HTMLElement;
        this.openCloseTab = document.querySelector('[data-side-menu-open-close-tab]') as HTMLDivElement;

        this.sideMenu.addEventListener('click', () => this.openClose());
    }

    private openClose() {
        if(this.sideMenu.classList.value === 'side-menu') {
            this.sideMenu.classList.add('side-menu-open');
            this.openCloseTab.innerHTML = '';
            this.openCloseTab.innerHTML = 'Close';
        } else {
            this.sideMenu.classList.remove('side-menu-open');
            this.openCloseTab.innerHTML = '';
            this.openCloseTab.innerHTML = 'Open';
        }
    }
}