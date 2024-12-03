import { component } from "@tmetcalfe89/vibrations";
import getPageModId from "../../../util/getPageModId";

export default component(
  ['[data-target="dependency-table"] tbody'],
  {},
  (parent, {}, { setState }) => {
    const requirementRows = [...parent.querySelectorAll("tr")];
    requirementRows.forEach((reqRow) => {
      const reqId = reqRow
        .querySelector(".table-require-name a")
        .href.split("/")[5];
      const notesEl = reqRow.querySelector(".table-require-notes");
      const notes = notesEl.innerText.trim();
      setState(
        `mods.'${getPageModId()}'.dependencies.'${reqId}'`,
        (p) =>
          p || {
            required: null,
            manual: false,
            notes,
          }
      );
    });
  }
);
