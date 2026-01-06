import { titleCase } from "./utils.js";
export let activeProject;

function setActive(proj) {
    activeProject = proj;
    proj.classList.add("active");
}

//Create project DOM object
export const createProject = function (title, active = false) {
    const projects = document.querySelector(".projects");

    for (const child of projects.children) {
        if (child.id === title) {
            console.log("Error! Project name already in use.")
            return 1;
        }
    }

    const project = document.createElement("div")

    project.addEventListener("click", (event) => {
        event.preventDefault();
        for (const child of projects.children) {
            child.classList.remove("active");
        }
        setActive(project);
    });

    if (active) {
        setActive(project);
    }

    
    const projectHeading = document.createElement("h2");
    projectHeading.textContent = title;
    project.appendChild(projectHeading);
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

export const createProjectForm = function () {
    const newProjectInfo = [];
    const newProjectDialog = document.querySelector("#new-project");
    const newProjectForm = document.querySelector("#new-project-form");

    newProjectForm.addEventListener("submit", (event) => {
        event.preventDefault();
        for (const row of newProjeftForm.children) {
            if 
        }
    })

}

//Add event listener for new project/task buttons
export const showDialogs = function() {
    const createButtons = document.querySelectorAll(".create-button");
    createButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const buttonDialog = document.querySelector(`#${button.id.slice(0, -7)}`);
            buttonDialog.showModal();
        })
    })
}