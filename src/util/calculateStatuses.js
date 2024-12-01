import { get, update } from "@tmetcalfe89/keychain";

export default function calculateStatuses(mods) {
  const statuses = {};

  const dependenciesScanned = {};
  function scanDependencies(modId) {
    if (dependenciesScanned[modId]) return;
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

  return statuses;
}
