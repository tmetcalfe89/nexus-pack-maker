import { component } from "@tmetcalfe89/vibrations";
import searchPageStyles from "../../style/searchPage.module.css";
import { squarePlusIcon } from "../icons";

export default component(
  [".mod-tile .tile-name"],
  {
    status: "statuses",
  },
  // TODO: Should I be able to attach a dependency during initialization?
  // As an example, this one doesn't know which mod it's for yet, but having it listen to *every* change on mods seems a bit gratuitous.
  (parent, { statuses }, { createElement }) => {
    const container = createElement("container", "div");

    const modId = parent.querySelector("a").href.split("/")[5];
    const status = statuses?.[modId];
    const button = createElement("button", "i", {
      className: `${searchPageStyles.inPack}`,
      innerHTML: squarePlusIcon(),
      title: status,
    });
    button.dataset.status = status;

    container.appendChild(button);
    parent.appendChild(container);
  },
  (parent, { statuses }, { getElement }) => {
    const button = getElement("button");
    const status = statuses?.[modId];
    button.dataset.status = status;
    button.title = status;
  }
);
