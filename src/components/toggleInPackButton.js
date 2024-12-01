import getPageModId from "../util/getPageModId";
import toggleButton from "./modPage/toggleButton";

export default toggleButton(
  `mods.'${getPageModId()}'.added`,
  (added, setState) => {
    if (!added) {
      setState(`mods.'${getPageModId()}'.rejected`, false);
    }
  },
  "Add",
  "Remove"
);
