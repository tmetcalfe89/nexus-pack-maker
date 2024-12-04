import { component } from "@tmetcalfe89/vibrations";
import { cubeIcon } from "./icons";
import createModal from "../util/createModal";
import packReviewStyles from "../style/packReview.module.css";
import { isIn } from "../util/calculateStatuses";

export default component(
  [".nav-interact-buttons"],
  { status: "statuses", mods: "mods" },
  (parent, { mods, statuses }, { createElement, listen }) => {
    const packReviewDiv = document.createElement("div");
    packReviewDiv.className = "nav-interact rj-upload";
    packReviewDiv.innerHTML = `
      <div class="ni-background"></div>
      ${cubeIcon()}
    `;

    const packList = createElement("packList", "div", {
      className: packReviewStyles.list,
      innerHTML: `
      <h2 class="${packReviewStyles.needsAttentionHeader}">Needs Attention</h2>
      <h2 class="${packReviewStyles.listHeader}">List</h2>`,
    });
    Object.entries(statuses)
      .filter(([_modId, status]) => {
        return isIn(status);
      })
      .sort(([aModId], [bModId]) => {
        const aName = mods[aModId]?.modTitle || aModId;
        const bName = mods[bModId]?.modTitle || bModId;
        return aName.localeCompare(bName);
      })
      .forEach(([modId, status]) => {
        const missingModData = !(modId in mods);
        const mod = mods[modId];
        const dependentsNeedingReview = mod?.dependencies
          ? Object.entries(mod.dependencies).filter(
              ([_modId, { required } = {}]) => required === null
            )
          : [];
        const modCard = createElement(`modCard-${modId}`, "section", {
          className:
            missingModData || dependentsNeedingReview.length
              ? packReviewStyles.needsAttentionEntry
              : packReviewStyles.listEntry,
          innerHTML: `
            <header>
              <h2>
                <a href="https://www.nexusmods.com/skyrimspecialedition/mods/${modId}">
                  ${missingModData ? modId : mod.modTitle}
                </a>
                ${missingModData ? `<small>Go get the mod data</small>` : ""}
                ${missingModData ? "" : `<small>${status}</small>`}
              </h2>
            </header>
            <main>
              ${
                dependentsNeedingReview.length
                  ? `<h3>Dependencies Need Review</h3>
                  <p>${dependentsNeedingReview
                    .map(
                      ([modId]) =>
                        `<a href="https://www.nexusmods.com/skyrimspecialedition/mods/${modId}">${modId}</a>`
                    )
                    .join(" ")}</p>`
                  : ""
              }
            </main>
            `,
        });
        packList.appendChild(modCard);
      });
    const packReviewModal = createModal(
      createElement,
      "packReviewModal",
      "Pack Review",
      {
        mainContent: packList,
      }
    );

    listen(
      packReviewDiv,
      "click",
      () => {
        packReviewModal.open = true;
      },
      { persistent: true }
    );

    parent.prepend(packReviewDiv);
  },
  (parent, { mods, statuses }, { getElement, createElement }) => {
    const packList = getElement("packList");
    packList.querySelectorAll("section").forEach((e) => e.remove());

    Object.entries(statuses)
      .filter(([_modId, status]) => {
        return isIn(status);
      })
      .sort(([aModId], [bModId]) => {
        const aName = mods[aModId]?.modTitle || aModId;
        const bName = mods[bModId]?.modTitle || bModId;
        return aName.localeCompare(bName);
      })
      .forEach(([modId, status]) => {
        const missingModData = !(modId in mods);
        const mod = mods[modId];
        const dependentsNeedingReview = mod?.dependencies
          ? Object.entries(mod.dependencies).filter(
              ([_modId, { required } = {}]) => required === null
            )
          : [];
        const modCard = createElement(`modCard-${modId}`, "section", {
          className:
            missingModData || dependentsNeedingReview.length
              ? packReviewStyles.needsAttentionEntry
              : packReviewStyles.listEntry,
          innerHTML: `
            <header>
              <h2>
                <a href="https://www.nexusmods.com/skyrimspecialedition/mods/${modId}">
                  ${missingModData ? modId : mod.modTitle}
                </a>
                ${missingModData ? `<small>Go get the mod data</small>` : ""}
                ${missingModData ? "" : `<small>${status}</small>`}
              </h2>
            </header>
            <main>
              ${
                dependentsNeedingReview.length
                  ? `<h3>Dependencies Need Review</h3>
                  <p>${dependentsNeedingReview
                    .map(
                      ([modId]) =>
                        `<a href="https://www.nexusmods.com/skyrimspecialedition/mods/${modId}">${modId}</a>`
                    )
                    .join(" ")}</p>`
                  : ""
              }
            </main>
            `,
        });
        packList.appendChild(modCard);
      });
  }
);
