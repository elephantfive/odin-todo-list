import "./styles.css";
import { createProject } from "./page.js";
import { createItemElement } from "./page.js";
import { activeProject } from "./page.js";

//Create to-do list item object
function createItem (title, desc, due, prio) {
    return { title, desc, due, prio }
}

const first = createItem("First", "this is an item", "tomorrow", "high");

createProject("General", true);

const testButton = document.querySelector("#test");
testButton.addEventListener("click", (event) => {
    createItemElement(first, activeProject);
})

//Create one part of a to-do list (title, desc, due date, prio)
function editItem(list, itemType, textVal) {
    list[itemType] = textVal;
}