import { component } from "@tmetcalfe89/vibrations";
import getPageModId from "../../../util/getPageModId";

export default component(["#pagetitle h1"], {}, (parent, {}, { setState }) => {
  setState(
    ["mods", getPageModId(), "modTitle"],
    (p) => p || parent.innerText.trim()
  );
});
