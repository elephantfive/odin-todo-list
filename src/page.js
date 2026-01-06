import { titleCase } from "./utils.js";
import { createList } from "./lists-and-projects.js";
import { createProject } from "./lists-and-projects.js";
import { projectList } from "./lists-and-projects.js";
let activeProject;
let activeList;

//Set active project
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
    const editProjectDialog = document.querySelector("#edit-project");
    const newProjectEditButton = document.createElement("button");
    newProjectEditButton.classList.add(buttonType);
    project.appendChild(newProjectEditButton)
    newProjectEditButton.textContent = buttonText
    newProjectEditButton.addEventListener("click", (event) => {
        setActive(project);
        editProjectDialog.showModal();
    })
}

//Handle editing project form
function initEditProjectForm() {
    const editProjectDialog = document.querySelector("#edit-project");
    const editProjectForm = document.querySelector("#edit-project-form");
    editProjectForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(editProjectForm);
        editProjectForm.reset();
        editProjectDialog.close();
        if (formData.get("title") in projectList) {
            console.log("Name already in use")
            return 1
        }
        projectList[formData.get("title")] = projectList[activeProject.children[0].textContent]
        delete projectList[activeProject.children[0].textContent];
        activeProject.children[0].textContent = formData.get("title");
    })
}

//create project DOM
export const createProjectElement = function (title, active = false) {
    if (title in projectList) {
        return 1
    }

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

//Create to-do edit button
function createListEditButton (list) {
    activeList = list;
    const newEditButton = document.createElement("button");
    newEditButton.classList.add('list-edit');
    list.appendChild(newEditButton);
    newEditButton.textContent = "Edit to-do list";
    newEditButton.addEventListener("click", (event) => {
        const editListDialog = document.querySelector("#edit-list");
        editListDialog.showModal();
    })
}

//Edit to-do list via form
function initEditListForm() {
    const editListDialog = document.querySelector("edit-list")
    const editListForm = document.querySelector("#edit-list-form")
    editListForm.addEventListener("submit", event => {
        event.preventDefault();
        const formData = new FormData(editListForm);
        for (const key in activeList) {
            activeList[key] = formData[key];
        }
        editListForm.reset();
        editListDialog.close();
    })
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
    createListEditButton(newItem);
    activeProject.appendChild(newItem);
}

//Create a new item (project or task)
function createItem (formId, formData) {
    const newDialog = document.querySelector(formId);
    const newForm = document.querySelector(`${formId}-form`);
    if (formId === "#new-list") {
        const newList = createList(formData.get("title"), formData.get("desc"), formData.get("due"), formData.get("prio"));
        createItemElement(newList);
    } else {
        createProjectElement(formData.get("title"), true);
    }
    newForm.reset();
    newDialog.close();
}

//Add event listener for either project or task form submission
function initCreateForm (formId) {
    const newForm = document.querySelector(`${formId}-form`);
    newForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(newForm);
        createItem(formId, formData);
    })
}

//Add event listener for new project/task buttons
function initCreateDialogButtons() {
    const createButtons = document.querySelectorAll(".create-button");
    createButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const buttonDialog = document.querySelector(`#${button.id.slice(0, -7)}`);
            buttonDialog.showModal();
        })
    })
}

//Initialize event listeners AIO
export const domInit = function () {
    initCreateForm("#new-project");
    initCreateForm("#new-list");
    initCreateDialogButtons()
    initEditProjectForm();
    initEditListForm()
}
