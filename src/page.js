const createListElement = function createListDomElement (project, list) {
    const newList = document.createElement("ul");
    newList.classList.add("todo-list");

    list.values().forEach((attribute) => {
        const newListItem = document.createElement("li");
        newListItem.textContent = list[attribute];
        newList.appendChild(newListItem);
    })

    project.appendChild(newList)
}

const createProjectElement = function createProjectDomElement (project) {
    const domProjectList = document.querySelector("#projects");
    const newProject = document.createElement("div");
    const projHeading = document.createElement("h2");

    projHeading.textContent = project["title"];

    newProject.appendChild(projHeading);
    domProjectList.appendChild(newProject);
}

export const createForm = function createFormWithDynamicElements(id, ...args) {
    const form = document.createElement("form");
    form.setAttribute("id", id);
    form.setAttribute("method", "dialog");
    form.setAttribute("action", '');

    args.forEach((arg) => {
        createRow(form, arg)
    })

    console.log(form);
    
}

export const createRow = function createFormRow (form, rowInfo) {
    const row = document.createElement(rowInfo['tagName']);
    Object.keys(rowInfo).forEach((key) => {
        if (key !== 'tagName') {
            row.setAttribute(`${key}`, rowInfo[key])
        }
    })
    form.appendChild(row);
}