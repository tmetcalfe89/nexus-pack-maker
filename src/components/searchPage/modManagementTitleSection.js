import { component } from "@tmetcalfe89/vibrations";
import searchPageStyle from "../../style/searchPage.module.css";

export default component(
  [".mod-tile .tile-name"],
  {},
  (parent, {}, { createElement }) => {
    const container = createElement("container", "div");
    container.className = searchPageStyle.modTileTitleActions;
    container.dataset.target = "mod-management-search-page-mod-tile";
    const modId = parent.querySelector("a").href.split("/")[5];
    container.dataset.modId = modId;
    parent.appendChild(container);
  }
);
