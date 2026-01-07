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

const createForm = function createFormWithDynamicElements(...args) {
    const form = document.createElement("form");
    form.setAttribute("method", "dialog");
    form.setAttribute("action", "");

    
}

export const createRow = function createFormRow (...args) {
        const row = document.createElement("input");
        args.forEach((arg) => {
            row.setAttribute(Object.keys(arg), Object.values(arg))
        })
        console.log(row);
    }