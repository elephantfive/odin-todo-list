import { titleCase } from "./utils.js";
import { createList } from "./lists-and-projects.js";
import { createProject } from "./lists-and-projects.js";
import { projects } from "./lists-and-projects.js";
export let activeProject;

function setActive(proj) {
    const projects = document.querySelector(".projects");
    for (const child of projects.children) {
        child.classList.remove("active");
    }
    activeProject = proj;
    proj.classList.add("active");
}

//Create project edit DOM object
function createEditButton (project, buttonType, buttonText) {
    const newProjectEditButton = document.createElement("button");
    newProjectEditButton.classList.add(buttonType);
    project.appendChild(newProjectEditButton)
    newProjectEditButton.textContent = buttonText
    newProjectEditButton.addEventListener("click", (event) => {
        setActive(project);
        editProject(project);
    })
}

//Project editing functionality
function editProject(project) {
    const editProjectDialog = document.querySelector("#edit-project");
    editProjectDialog.showModal();
}

//Handle editing form
export const handleEditProjectForm = function() {
    const editProjectDialog = document.querySelector("#edit-project");
    const editProjectForm = document.querySelector("#edit-project-form");
    editProjectForm.addEventListener("submit", (event) => {
        event.preventDefault();
        activeProject.children[0].textContent = editProjectForm.children[0].children[1].value;
        editProjectForm.reset();
        editProjectDialog.close();
    })
}

export const createProjectElement = function (title, active = false) {
    createProject(title);

    const projects = document.querySelector(".projects");
    const project = document.createElement("div")
    project.addEventListener("click", (event) => {
        event.preventDefault();
        setActive(project);
    });
    if (active) {
        setActive(project);
    }
    
    const projectHeading = document.createElement("h2");
    projectHeading.textContent = title;
    project.appendChild(projectHeading);
    createEditButton(project, "edit-project", "Edit Project");
    project.classList.add("project");
    project.id = title;
    projects.appendChild(project);
}

//Create to-do item DOM object
export const createItemElement = function (item) {
    const newItem = document.createElement("div");
    const itemList = document.createElement("ul");
    
    for (const attribute in item) {
        const newListItem = document.createElement("li");
        newListItem.textContent = `${titleCase(attribute)}: ${item[attribute]}`;
        newListItem.classList.add(attribute);
        itemList.appendChild(newListItem);
    }

    newItem.appendChild(itemList);
    activeProject.appendChild(newItem);
}

//Create a new item (project or task)
function createItem (formId) {
    const newInfo = [];
    const newDialog = document.querySelector(formId);
    const newForm = document.querySelector(`${formId}-form`);
    for (const row of newForm.children) {
        for (const child of row.children) {
            if (child.hasAttribute('id')) {
                newInfo.push(child.value);
            }
        }
    }
    if (formId === "#new-list") {
        const newList = createList(newInfo[0], newInfo[1], newInfo[2], newInfo[3]);
        createItemElement(newList);
    } else {
        createProjectElement(newInfo[0], true);
    }
    newForm.reset();
    newDialog.close();
}

//Add event listener for either project or task form submission
export const addType = function (formId) {
    const newForm = document.querySelector(`${formId}-form`);
    newForm.addEventListener("submit", (event) => {
        event.preventDefault();
        createItem(formId);
    })
}

//Add event listener for new project/task buttons
export const linkDialogs = function() {
    const createButtons = document.querySelectorAll(".create-button");
    createButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const buttonDialog = document.querySelector(`#${button.id.slice(0, -7)}`);
            buttonDialog.showModal();
        })
    })
}
