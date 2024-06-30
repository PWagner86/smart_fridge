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
    const input = document.querySelector('[data-item-input]') as HTMLInputElement;
    const itemAddBtn = document.querySelector('[data-item-add]') as HTMLButtonElement;
    const drosselSelect = document.querySelector('[data-drossel-comp]') as HTMLSelectElement;
    const kompressorSelect = document.querySelector('[data-kompressor-comp]') as HTMLSelectElement;
    const filterSelect = document.querySelector('[data-filter-comp]') as HTMLSelectElement;

    this.openCloseTab.addEventListener("click", () => this.openClose());
    itemAddBtn.addEventListener("click", () => {
      this.addItem(input.value);
      this.history.addToFridge(input.value);
    });
    filterSelect.addEventListener('change', () => this.service.setFilter(filterSelect.value))
    kompressorSelect.addEventListener('change', () => this.service.setKompressor(kompressorSelect.value));
    drosselSelect.addEventListener('change', () => this.service.setDrossel(drosselSelect.value));
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
}
