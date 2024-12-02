import { component } from "@tmetcalfe89/vibrations";
import getPageModId from "../../../util/getPageModId";

export default component(
  [".tab-description"],
  {},
  (parent, {}, { setState }) => {
    setState(
      ["mods", getPageModId(), "notes"],
      (p) => p || parent.querySelector("p").innerText.trim()
    );
  }
);
