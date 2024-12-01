import { component } from "@tmetcalfe89/vibrations";
import modPageStyle from "../style/modPage.module.css";
import getPageModId from "../util/getPageModId";

export default component(
  ["#feature", "#nofeature"],
  {
    [`status.'${getPageModId()}'`]: "status",
  },
  (parent, { status }, { createElement }) => {
    const statusEl = createElement("status", "div", {
      className: modPageStyle.status,
      innerText: status,
    });
    statusEl.dataset.status = status;
    parent.prepend(statusEl);
  },
  (parent, { status }, { getElement }) => {
    const statusEl = getElement("status");
    statusEl.dataset.status = status;
    statusEl.innerText = status;
  }
);
