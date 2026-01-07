import { createProject } from "./project.js";

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

const createProjectElement = function createProjectDomElement () {
    const domProjectList = document.querySelector("#projects");
    const newProject = document.createElement("div");
    const projHeading = document.createElement("h2");
    const newDialog = document.createElement("dialog");
    const newForm = createForm(
        {
            "tagName": "input",
            "type": "text",
            "name": "title",
            "id": "title",
            "required": '',
        },
        {
            "tagName": "input",
            "type": "submit",
            "value": "Submit",
            
    },)
    domProjectList.appendChild(newDialog);
    newDialog.appendChild(newForm);
    newDialog.showModal();

    newForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(newForm);
        if (createProject(formData.get("title"))) {
            projHeading.textContent = formData.get("title")
            newProject.appendChild(projHeading);
            domProjectList.appendChild(newProject);
        }
        
        newDialog.close();
        newDialog.remove();
    })


}

export const createForm = function createFormWithVariableParameters (...args) {
    const form = document.createElement("form");

    const createRow = function createFormRowWithVariableParameters (form, rowInfo) {
        const row = document.createElement(rowInfo['tagName']);
        row.textContent = rowInfo['textContent'];
        Object.keys(rowInfo).forEach((key) => {
            if (key !== 'tagName' && key !== 'textContent') {
                row.setAttribute(`${key}`, rowInfo[key])
            }
        })
        form.appendChild(row);
    }

    form.setAttribute("method", "dialog");
    form.setAttribute("action", '');

    args.forEach((arg) => {
        createRow(form, arg)
    })
    return form;
}

export const handleClickEvents = function handleListenersForClickEvents (id) {
    const element = document.querySelector(id);
    element.addEventListener("click", (event) => {
        event.preventDefault();
        switch(id) {
            case "#new-project-button":
                createProjectElement();
                break;
        }
    })
    
}



