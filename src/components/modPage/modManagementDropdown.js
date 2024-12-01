import { component } from "@tmetcalfe89/vibrations";

export default component(
  [".modactions"],
  {},
  (parent, {}, { createElement }) => {
    const dropdown = createElement("dropdown", "li", {
      innerHTML: `<div class="drop-down action-custom">
        <div class="btn inline-flex" tabindex="0">
          <span class="flex-label">Manage Mod</span>
          <svg title="" class="icon icon-arrow">
            <use
              xlink:href="https://www.nexusmods.com/assets/images/icons/icons.svg#icon-arrow"
            ></use>
          </svg>
        </div>
        <div class="subnav">
          <ul class="sublist clearfix" data-target="mod-management"></ul>
        </div>
      </div>`,
    });
    parent.appendChild(dropdown);
  }
);
