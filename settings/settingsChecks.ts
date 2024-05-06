export function getStoredBooleanSettingValue(setting: string | null) {
    if (setting === "true") {
        return true;
    }
    else if (setting === "false") {
        return false;
    }
    else {
        throw `Invalid stored setting value to coerce to boolean: ${setting}`;
    }
}