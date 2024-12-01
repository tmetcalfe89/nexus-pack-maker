import { component } from "@tmetcalfe89/vibrations";
import getPageModId from "../util/getPageModId";

export default component(
  ['[data-target="mod-management"]'],
  {
    [`status.'${getPageModId()}'`]: "status",
  },
  (parent, { status }, { createElement, setState }) => {
    console.log("toggleRejectButton");
    const listItem = document.createElement("li");
    const button = createElement("button", "a", {
      innerText: status === "Rejected" ? "Unreject" : "Reject",
    });
    listItem.appendChild(button);
    parent.appendChild(listItem);

    button.addEventListener("click", () => {
      setState(["mods", getPageModId(), "rejected"], (p) => !p);
    });
  },
  (parent, { status }, { getElement }) => {
    const button = getElement("button");
    button.innerText = status === "Rejected" ? "Unreject" : "Reject";
  }
);
