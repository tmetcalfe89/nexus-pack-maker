import { createVibration } from "@tmetcalfe89/vibrations";
import components from "./components";
import sideEffects from "./sideEffects";
import calculateStatuses from "./util/calculateStatuses";
import "./style/overwrite.css";

const initialMods = JSON.parse(localStorage.getItem("tims-nexusmanager"));
createVibration(
  {
    mods: initialMods,
    status: calculateStatuses(initialMods),
  },
  [...components, ...sideEffects],
  {
    debug: true,
  }
);
