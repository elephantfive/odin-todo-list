import "./styles.css";
import { createProjectElement } from "./page.js";
import { linkDialogs } from "./page.js";
import { addType } from "./page.js";
import { handleEditProjectForm } from "./page.js";

linkDialogs();
handleEditProjectForm();

createProjectElement("General", true);
addType("#new-project");
addType("#new-list");