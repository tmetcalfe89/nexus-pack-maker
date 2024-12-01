import { sideEffect } from "@tmetcalfe89/vibrations";
import calculateStatuses from "../util/calculateStatuses";

export default sideEffect({ mods: "mods" }, ({ mods }, { setState }) => {
  const newStatuses = calculateStatuses(mods);
  setState("status", newStatuses);
});
