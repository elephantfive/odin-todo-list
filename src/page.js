const createListElement = function createListDomElement (project, list) {
    const newList = document.createElement("ul");
    newList.classList.add("todo-list");

    for (const attribute in list) {
        const newListItem = document.createElement("li");
        newListItem.textContent = list[attribute];
        newList.appendChild(newListItem);
    }

    project.appendChild(newList)
}