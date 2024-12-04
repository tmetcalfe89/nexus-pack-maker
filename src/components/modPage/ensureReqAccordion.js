import { component } from "@tmetcalfe89/vibrations";

export default component(
  [".tab-description .accordion"],
  {},
  (parent, {}, { createElement }) => {
    if (!parent.querySelector('[data-tracking*="View Requirements"]')) {
      const dt = createElement("dt", "dt", {
        className: "clearfix",
        innerHTML: `<span class="acc-status">
          <svg title="" class="icon icon-arrow"><use xlink:href="https://www.nexusmods.com/assets/images/icons/icons.svg#icon-arrow"></use></svg>
        </span>
        `,
      });
      dt.dataset.tracking = `[&quot;Mod Page&quot;,&quot;View Requirements&quot;,&quot;Collapse&quot;]`;

      const dd = createElement("dd", "dd", {
        className: "clearfix",
      });
      parent.prepend(dd);
      parent.prepend(dt);
    }
  }
);
