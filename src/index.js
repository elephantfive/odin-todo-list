import "./styles.css";
import { createProjectElement } from "./page.js";
import { domInit } from "./page.js";
import { format } from "date-fns";


console.log(format(new Date(2014, 1, 11), "MM/dd/yyyy"))

domInit();
createProjectElement("General", true);
