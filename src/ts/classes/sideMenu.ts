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
    const addButtons = [...document.querySelectorAll('[data="add-button"]')] as Array<HTMLButtonElement>;
    // addButtons.forEach(button => {
    //     button.addEventListener('click', (e: Event) => {
    //         const parent: HTMLLIElement = e.target.parentElement;
    //         console.log(parent);
    //     });
    // })
  }

  private setCapacity() {
    const capacity = document.querySelector("[data-capacity]") as HTMLLIElement;
    capacity.innerHTML = "";
    capacity.innerHTML = `Kapazität: <span>${this.countItems()} / 120</span>`;
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
    fridgeItems.forEach((item) => {
      const li: HTMLLIElement = this.createItem(item.name, item.amount);
      this.uList.append(li);
    });
  }


  private countItems() {
    return fridgeItems.reduce((acc, curr) => acc + curr.amount, 0);
  }

  private createItem(name: string, amount: number = 1) {
    const li = document.createElement("li") as HTMLLIElement;
    li.setAttribute("data", "item-list-item");
    li.classList.add("item-list-item");

    const addButton = document.createElement('button') as HTMLButtonElement;
    addButton.setAttribute("data", "add-button");
    addButton.innerHTML = '+';
    const removeButton = document.createElement('button') as HTMLButtonElement;
    removeButton.setAttribute("data", "remove-button");
    removeButton.innerHTML = '-';

    li.innerHTML = `${amount} x ${name}`;
    li.append(addButton, removeButton);
    return li;
  }
}
