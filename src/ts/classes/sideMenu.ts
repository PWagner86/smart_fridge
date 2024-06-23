import { fridgeItems } from "../utils/fridgeItems";
import { FridgeItem } from "../utils/types";

export default class SideMenu {
  private sideMenu: HTMLElement;
  private openCloseTab: HTMLDivElement;
  private uList: HTMLUListElement;
  private itemList: Array<HTMLLIElement>;
  private list: Array<string>;

  constructor() {
    this.sideMenu = document.querySelector("[data-side-menu]") as HTMLElement;
    this.openCloseTab = document.querySelector("[data-side-menu-open-close-tab]") as HTMLDivElement;
    this.uList = document.querySelector("[data-item-list]") as HTMLUListElement;
    this.itemList = [...document.querySelectorAll("[data-item-list-item]"),] as Array<HTMLLIElement>;
    this.list = [];
    this.itemList.forEach((item) => this.list.push(item.innerText));

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
    this.openCloseTab.addEventListener("click", () => this.openClose());
    document.querySelector('[data-item-add]')?.addEventListener("click", () => this.addItem(input.value));
    document.querySelector('[data-item-remove]')?.addEventListener("click", () => this.addItem(input.value));
  }

  private setCapacity() {
    const capacity = document.querySelector("[data-capacity]") as HTMLLIElement;
    capacity.innerHTML = "";
    capacity.innerHTML = `Kapazität: <span>${this.countItems()} / 120</span>`;
  }

  private plusItem(e: any){
    const id: number = e.target.parentElement.getAttribute("data-id");
    fridgeItems[id].amount++;
    this.populateList();
    this.setCapacity();
  }

  private minusItem(e: any) {
    const id: number = e.target.parentElement.getAttribute("data-id");
    fridgeItems[id].amount--;
    if(fridgeItems[id].amount == 0) {
      fridgeItems.splice(id, 1);
    }
    this.populateList();
    this.setCapacity();
  }

  private addItem(inputItem: string) {

    const item: FridgeItem | undefined = fridgeItems.find(item => item.name == inputItem );

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
