import getPageModId from "../util/getPageModId";
import { component } from "@tmetcalfe89/vibrations";

export default component(
  ['[data-target="mod-management"]'],
  {
    [`status.'${getPageModId()}'`]: "status",
  },
  (parent, { status }, { createElement, setState }) => {
    console.log("toggleInPackButton");
    const listItem = document.createElement("li");
    const button = createElement("button", "a", {
      innerText: status === "Desired" ? "Remove" : "Add",
    });
    listItem.appendChild(button);
    parent.appendChild(listItem);

    button.addEventListener("click", () => {
      setState(`mods.'${getPageModId()}'.added`, (p) => !p);
    });
  },
  (parent, { status }, { getElement }) => {
    const button = getElement("button");
    button.innerText = status === "Desired" ? "Remove" : "Add";
  }
);
