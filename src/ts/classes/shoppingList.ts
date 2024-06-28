export default class ShoppingList {
    
    private shoppingList: HTMLUListElement;
    private list: Set<string>;

    constructor() {
        this.shoppingList = document.querySelector('[data-shopping-list]') as HTMLUListElement;
        this.list = new Set();
    }

    private populateList() {
        this.shoppingList.innerHTML = '';
        this.list.forEach(item => {
            const li: HTMLLIElement = document.createElement('li');
            li.classList.add('shopping-list-item');
            li.innerText = item;
            this.shoppingList.append(li);
            console.log(this.list);
        })
    }

    public addItem(itemName: string) {
        this.list.add(itemName);
        this.populateList();
    }
}