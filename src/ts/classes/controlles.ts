import { fridgeItems } from "../utils/fridgeItems";
import { FridgeItem } from "../utils/types";
import ShoppingList from "./shoppingList";
import History from "./history";
import Service from "./service";

export default class Controlles {
  private sideMenu: HTMLElement;
  private openCloseTab: HTMLDivElement;
  private uList: HTMLUListElement;
  private itemList: Array<HTMLLIElement>;
  private list: Array<string>;
  private MAXCAP: number
  private shoppingList: ShoppingList;
  private history: History;
  private service: Service;

  private input: HTMLInputElement;
  private itemAddBtn: HTMLButtonElement;

  private drosselSelect: HTMLSelectElement;
  private kompressorSelect: HTMLSelectElement;
  private filterSelect: HTMLSelectElement;
  
  private filter: HTMLDivElement;
  private filterCount: HTMLSpanElement;
  private kompressor: HTMLDivElement;
  private kompressorCount: HTMLSpanElement;
  private drossel: HTMLDivElement;
  private drosselCount: HTMLSpanElement;
  
  private freezerBtn: HTMLInputElement;
  private fridgeBtn: HTMLInputElement;
  private freezerStatus: HTMLSpanElement;
  private fridgeStatus: HTMLSpanElement;
  private freezerTemp: HTMLSpanElement;
  private freezerTempNum: number;
  private FREZZER_MIN_TEMP: number;
  private fridgeTemp: HTMLSpanElement;
  private fridgeTempNum : number;
  private FRIDGE_MIN_TEMP: number;
  private freezerInterval: any;
  private fridgeInterval: any;
  private MAXTEMP: number;
  private fridgeTermo: HTMLElement;
  private freezerTermo: HTMLElement;

  constructor() {
    this.sideMenu = document.querySelector("[data-side-menu]") as HTMLElement;
    this.openCloseTab = document.querySelector("[data-side-menu-open-close-tab]") as HTMLDivElement;
    this.uList = document.querySelector("[data-item-list]") as HTMLUListElement;
    this.itemList = [...document.querySelectorAll("[data-item-list-item]"),] as Array<HTMLLIElement>;
    this.list = [];
    this.itemList.forEach((item) => this.list.push(item.innerText));
    this.MAXCAP = 120;
    this.shoppingList = new ShoppingList();
    this.history = new History();
    this.service = new Service();
    this.input = document.querySelector('[data-item-input]') as HTMLInputElement;
    this.itemAddBtn = document.querySelector('[data-item-add]') as HTMLButtonElement;

    this.drosselSelect = document.querySelector('[data-drossel-comp]') as HTMLSelectElement;
    this.kompressorSelect = document.querySelector('[data-kompressor-comp]') as HTMLSelectElement;
    this.filterSelect = document.querySelector('[data-filter-comp]') as HTMLSelectElement;
    
    this.filter = document.querySelector('[data-filter]') as HTMLDivElement;
    this.filterCount = document.querySelector('[data-filter-count]') as HTMLSpanElement;
    this.kompressor = document.querySelector('[data-kompressor]') as HTMLDivElement;
    this.kompressorCount = document.querySelector('[data-kompressor-count]') as HTMLSpanElement;
    this.drossel = document.querySelector('[data-drossel]') as HTMLDivElement;
    this.drosselCount = document.querySelector('[data-drossel-count]') as HTMLSpanElement;
    
    this.freezerBtn = document.querySelector('[data-freezer-btn]') as HTMLInputElement;
    this.fridgeBtn = document.querySelector('[data-fridge-btn]') as HTMLInputElement;
    this.freezerStatus = document.querySelector('[data-freezer-status]') as HTMLSpanElement;
    this.fridgeStatus = document.querySelector('[data-fridge-status]') as HTMLSpanElement;
    this.freezerTemp = document.querySelector('[data-freezer-temp]') as HTMLSpanElement;
    this.freezerTempNum = -8;
    this.FREZZER_MIN_TEMP = -8;
    this.fridgeTemp = document.querySelector('[data-fridge-temp]') as HTMLSpanElement;
    this.fridgeTempNum = 4;
    this.FRIDGE_MIN_TEMP = 4;
    this.MAXTEMP = 25
    this.fridgeTermo = document.querySelector('[data-fridge-termo]') as HTMLElement;
    this.freezerTermo = document.querySelector('[data-freezer-termo]')as HTMLElement;

    this.populateList();
    this.setCapacity();
  }

  private openClose() {
    if (this.sideMenu.classList.value === "side-menu") {
      this.sideMenu.classList.add("side-menu-open");
      this.openCloseTab.innerHTML = "";
      this.openCloseTab.innerHTML = "Close";
    } else {
      this.sideMenu.classList.remove("side-menu-open");
      this.openCloseTab.innerHTML = "";
      this.openCloseTab.innerHTML = "Open";
    }
  }

  public addEventListeners() {
    this.openCloseTab.addEventListener("click", () => this.openClose());

    this.itemAddBtn.addEventListener("click", () => {
      this.addItem(this.input.value);
      this.history.addToFridge(this.input.value);
    });

    this.filterSelect.addEventListener('change', () => this.service.setComponent(this.filter, this.filterCount, this.filterSelect.value));
    this.kompressorSelect.addEventListener('change', () => this.service.setComponent(this.kompressor, this.kompressorCount, this.kompressorSelect.value));
    this.drosselSelect.addEventListener('change', () => this.service.setComponent(this.drossel, this.drosselCount, this.drosselSelect.value));

    this.freezerBtn.addEventListener('change', () => {
      clearInterval(this.freezerInterval);
      this.setOnlineOffline(this.freezerBtn, this.freezerStatus);
      if(!this.freezerBtn.checked) {
        this.freezerInterval = setInterval(() => {
          this.freezerTempNum++;
          this.freezerTemp.innerHTML = `${this.freezerTempNum}°`;
          if(this.freezerTempNum >= 10) {
            this.freezerTermo.style.color = '#fc2f2f';
          } else {
            this.freezerTermo.style.color = '#00a2ff';
          }
          if(this.freezerTempNum === this.MAXTEMP) clearInterval(this.freezerInterval);
        }, 1000);
      } else {
        this.freezerInterval = setInterval(() => {
          this.freezerTempNum--;
          this.freezerTemp.innerHTML = `${this.freezerTempNum}°`;
          if(this.freezerTempNum >= 10) {
            this.freezerTermo.style.color = '#fc2f2f';
          } else {
            this.freezerTermo.style.color = '#00a2ff';
          }
          if(this.freezerTempNum === this.FREZZER_MIN_TEMP) clearInterval(this.freezerInterval);
        }, 1000)
      }
    });
    this.fridgeBtn.addEventListener('change', () => {
      clearInterval(this.fridgeInterval);
      this.setOnlineOffline(this.fridgeBtn, this.fridgeStatus);
      if(!this.fridgeBtn.checked) {
        this.fridgeInterval = setInterval(() => {
          this.fridgeTempNum++;
          this.fridgeTemp.innerHTML = `${this.fridgeTempNum}°`;
          if(this.fridgeTempNum >= 10) {
            this.fridgeTermo.style.color = '#fc2f2f';
          } else {
            this.fridgeTermo.style.color = '#00a2ff';
          }
          if(this.fridgeTempNum === this.MAXTEMP) clearInterval(this.fridgeInterval);
        }, 1000);
      } else {
        this.fridgeInterval = setInterval(() => {
          this.fridgeTempNum--;
          this.fridgeTemp.innerHTML = `${this.fridgeTempNum}°`;
          if(this.fridgeTempNum >= 10) {
            this.fridgeTermo.style.color = '#fc2f2f';
          } else {
            this.fridgeTermo.style.color = '#00a2ff';
          }
          if(this.fridgeTempNum === this.FRIDGE_MIN_TEMP) clearInterval(this.fridgeInterval);
        }, 1000)
      }
    });
  }

  private setCapacity() {
    let count: number = this.countItems();
    const capacity = document.querySelector("[data-capacity]") as HTMLLIElement;
    if(count <= 100) {
      capacity.innerHTML = "";
      capacity.innerHTML = `Kapazität: <span class="good">${count} / ${this.MAXCAP}</span>`;  
    } else if(count > 100 && count <= 110) {
      capacity.innerHTML = "";
      capacity.innerHTML = `Kapazität: <span class="warning">${count} / ${this.MAXCAP}</span>`;  
    } else if(count > 110 && count < 120) {
      capacity.innerHTML = "";
      capacity.innerHTML = `Kapazität: <span class="danger">${count} / ${this.MAXCAP}</span>`;  
    } else {
      count = this.MAXCAP;
      capacity.innerHTML = "";
      capacity.innerHTML = `Kapazität: <span class="danger">${count} / ${this.MAXCAP}</span>`;  
    }
  }

  private plusItem(e: any){
    const id: number = e.target.parentElement.getAttribute("data-id");
    const count: number = this.countItems();
    if(count === this.MAXCAP){
      return;
    }
    fridgeItems[id].amount++;
    this.populateList();
    this.history.addToFridge(fridgeItems[id].name);
    this.setCapacity();
  }

  private minusItem(e: any) {
    const id: number = e.target.parentElement.getAttribute("data-id");
    fridgeItems[id].amount--;
    if(fridgeItems[id].amount == 0) {
      this.history.removeFromFridge(fridgeItems[id].name);
      this.shoppingList.addItem(fridgeItems[id].name);
      fridgeItems.splice(id, 1);
      this.populateList();
      return;
    }
    this.history.removeFromFridge(fridgeItems[id].name);
    this.populateList();
    this.setCapacity();
  }

  private addItem(inputItem: string) {
    if(inputItem == '') return;
    const count: number = this.countItems();
    const item: FridgeItem | undefined = fridgeItems.find(item => item.name == inputItem );
    if(count === this.MAXCAP) return;
    if(item == undefined) {
        fridgeItems.push({name: inputItem, amount: 1});
    } else {
        item.amount++;
    }
    this.populateList();
    this.setCapacity();
  }

  private populateList() {
    this.uList.innerHTML = '';
    fridgeItems.forEach((item, index) => {
      const li: HTMLLIElement = this.createItem(index, item.name, item.amount);
      this.uList.append(li);
    });
  }


  private countItems() {
    return fridgeItems.reduce((acc, curr) => acc + curr.amount, 0);
  }

  private createItem(id: number, name: string, amount: number = 1) {
    const li = document.createElement("li") as HTMLLIElement;
    li.setAttribute("data", "item-list-item");
    li.setAttribute("data-id", `${id}`);
    li.classList.add("item-list-item");

    const addButton = document.createElement('button') as HTMLButtonElement;
    addButton.classList.add('add-button');
    addButton.setAttribute("data", "add-button");
    addButton.innerHTML = '+';
    addButton.addEventListener('click', (e) => this.plusItem(e));

    const removeButton = document.createElement('button') as HTMLButtonElement;
    removeButton.classList.add('remove-button');
    removeButton.setAttribute("data", "remove-button");
    removeButton.innerHTML = '-';
    removeButton.addEventListener('click', (e) => this.minusItem(e));

    li.innerHTML = `<div>${amount} x ${name}</div>`;
    li.append(addButton, removeButton);
    return li;
  }

  private setOnlineOffline(btn: HTMLInputElement, text: HTMLSpanElement) {
    if(btn.checked == true) {
        text.innerText = 'Online';
        text.style.color = '#7eff7e';
    } else {
        text.innerText = 'Offline';
        text.style.color = '#fc2f2f';
    }
  }
}
