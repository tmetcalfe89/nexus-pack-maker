import getPageModId from "../../util/getPageModId";
import toggleButton from "./toggleButton";

export default toggleButton(
  `mods.'${getPageModId()}'.rejected`,
  (rejected, setState) => {
    if (!rejected) {
      setState(`mods.'${getPageModId()}'.added`, false);
    }
  },
  "Reject",
  "Unreject"
);
