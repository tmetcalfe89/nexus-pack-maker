import { component } from "@tmetcalfe89/vibrations";

export default component(
  [".mod-tile .tile-name"],
  {},
  (parent, {}, { createElement }) => {
    const container = createElement("container", "div");
    container.dataset.target = "mod-management-search-page-mod-tile";
    const modId = parent.querySelector("a").href.split("/")[5];
    container.dataset.modId = modId;
    parent.appendChild(container);
  }
);
