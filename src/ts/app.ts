import Manager from "./classes/manager";

const timeElm = document.querySelector('[data-time]') as HTMLHeadingElement;
const dateElm = document.querySelector('[data-date]') as HTMLHeadingElement;
const manager: Manager = new Manager(timeElm, dateElm);

manager.init();