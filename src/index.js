import "./styles.css";
import { createProject } from "./page.js";
import { showDialogs } from "./page.js";
import { addType } from "./page.js";
import { handleEditProjectForm } from "./page.js";


handleEditProjectForm();
createProject("General", true);
showDialogs();
addType("#new-project");
addType("#new-list");