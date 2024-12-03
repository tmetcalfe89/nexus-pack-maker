import { get, update } from "@tmetcalfe89/keychain";

function isIn(status) {
  return status === "Dependency" || status === "Desired" || status === "Compat";
}

export default function calculateStatuses(mods) {
  const statuses = {};

  const dependenciesScanned = {};
  function scanDependencies(modId) {
    if (dependenciesScanned[modId]) return false;
    dependenciesScanned[modId] = true;
    const mod = mods[modId];
    if (mod?.dependencies) {
      Object.entries(mod.dependencies).forEach(([depId, dependency]) => {
        if (!dependency.required) return;
        const currentStatus = get([depId], statuses);
        if (!currentStatus || currentStatus === "Unreviewed") {
          update([depId], "Dependency", statuses);
        }
        scanDependencies(depId);
      });
      return true;
    }
    return false;
  }

  function scanCompat() {
    let found = false;
    for (const modId in mods) {
      const { compat } = mods[modId];
      if (!compat?.length) continue;
      if (
        !isIn(statuses[modId]) &&
        compat.some(
          (list) =>
            list.length > 1 &&
            list.every((compatDepId) => isIn(statuses[compatDepId]))
        )
      ) {
        found = true;
        statuses[modId] = "Compat";
      }
    }
    if (found) {
      scanCompat();
    }
  }

  for (const modId in mods) {
    const mod = mods[modId];
    if (mod.added) {
      update([modId], "Desired", statuses);
      scanDependencies(modId);
    } else if (mod.rejected) {
      update([modId], "Rejected", statuses);
    } else if (!(modId in statuses)) {
      update([modId], "Unreviewed", statuses);
    }
  }
  scanCompat();

  return statuses;
}
