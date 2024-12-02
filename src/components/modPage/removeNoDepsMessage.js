import { component } from "@tmetcalfe89/vibrations";

export default component(
  ['.tab-description .accordion dt[data-tracking*="View Requirements"] + dd'],
  {},
  (parent) => {
    const sillyExtraThing = [...parent.querySelectorAll("h3")].find(
      (e) =>
        e.innerText ===
        "This mod does not have any known dependencies other than the base game."
    );
    if (sillyExtraThing) {
      sillyExtraThing.parentNode.remove();
    }
  }
);
