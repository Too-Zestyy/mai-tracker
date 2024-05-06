import AsyncStorage from "@react-native-async-storage/async-storage";
// Async not being declared as callback system is being used to better align with React Native's `UseEffect()`

const set_settings_to_default = (keys: string[], value: any) => {
  // Using standrd for loop as using for (var) seems to break setting storage
  for (let i = 0; i < keys.length; i++) {
    set_setting_to_default(keys[i], value);
  }
}

const set_setting_to_default = (setting_key: string, value: any) => {
  AsyncStorage.getItem(setting_key)
    .then(curr_setting => {
      // alert(curr_setting);
      if (curr_setting === null) {
        
        AsyncStorage.setItem(setting_key, value.toString())
        .then(() => {})
        .catch(e => {alert(`Error when setting a default setting: ${e}`)});
      }
    })
    .catch(e => {alert(`Error when validating a default setting: ${e}`)});
}

export const validateSettings = () => {
    try {
        const false_default_boolean_settings_keys: string[] = [
            "settings-cache-profile-enabled",
            "settings-cache-history-enabled"
        ]
        const true_default_boolean_settings_keys: string[] = [
        ]

        // Loop through keys and set to false or true by var name
        set_settings_to_default(false_default_boolean_settings_keys, false);
        set_settings_to_default(true_default_boolean_settings_keys, true);

        // TODO: Then set defaults for more complex settings
        set_setting_to_default("maitea-key", "N/A");
    }
    catch (e) {
        alert(`Error validating settings: ${e}`)
    }
}

export const saveMaiTeaKey = (key: string) => {
    // alert(maiTeaKey);
      try {
        AsyncStorage.setItem('maitea-key', key);
      } catch (e) {
        alert(e);
      }
}

export const getMaiTeaKey = () => {
    try {
      const value = AsyncStorage.getItem('maitea-key');
      if (value !== null) {
        return value;
      }
      else {
        return "";
      }
    } catch (e) {
      alert(e);
      return "";
    }
}