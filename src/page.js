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

const createProjectElement = function createProjectDomElement (project) {
    const domProjectList = document.querySelector("#projects");
    [...domProjectList.children].forEach((child) => {
        child.classList.remove("active");
    })
    const newProject = document.createElement("div");
    newProject.classList.add("active");
    newProject.classList.add("project");
    const projHeading = document.createElement("h2");
    projHeading.textContent = project;
    newProject.appendChild(projHeading);
    domProjectList.appendChild(newProject);
    handleClickEvents(".project");
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
    const body = document.querySelector("body")
    const createProjectCheck = function checkValidityOfNewProjectName () {
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
        body.appendChild(newDialog);
        newDialog.appendChild(newForm);
        newDialog.showModal();

        newForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(newForm);
            if (createProject(formData.get("title"))) {
                createProjectElement(formData.get("title"));
            }
            newDialog.close();
            newDialog.remove();
        })
    }

    const changeActive = function changeActiveProject() {
        const projects = document.querySelector("#projects");
        [...projects.children].forEach((child) => {
            child.classList.remove("active")
        })
    }

    const elements = document.querySelectorAll(id);
    elements.forEach((element) => {
        element.addEventListener("click", (event) => {
            event.preventDefault();
            switch(id) {
                case "#new-project-button":
                    createProjectCheck();
                    break;
                case ".project":
                    changeActive();
                    element.classList.add("active");
                    break;
            }
        })
    })
}



