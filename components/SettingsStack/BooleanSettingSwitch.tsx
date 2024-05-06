import AsyncStorage from "@react-native-async-storage/async-storage";
import { PropsWithRef, useEffect, useRef, useState } from "react";
import { Label, Switch, Text, XStack } from "tamagui";
import { getStoredBooleanSettingValue } from "../../settings/settingsChecks";

type Props = {
    label: string;
    settingKey: string;
    startingValue: boolean
    width: number;
};
  

export default function BooleanSettingSwitch({label, settingKey, startingValue, width}: Props) {
    const [setting, setSetting] = useState<boolean>(startingValue);
    const switchRef = useRef(null);

    useEffect(() => {

        AsyncStorage.getItem(settingKey)
        .then(stored_setting => {
            setSetting(getStoredBooleanSettingValue(stored_setting));
        })
        .catch(e => {
            alert(`Failed to set a stored setting on a setting switch: ${e}`);
        })

        return () => {

        }

    }, [settingKey, switchRef])

    return (
        <XStack width={width*0.75} alignItems="center" justifyContent="space-between">
            
            <Label htmlFor="Check1">{label}</Label>

            <XStack width={width*0.27} justifyContent="space-between">
                <Text>N</Text>

                <Switch size="$2" ref={switchRef} defaultChecked={setting} onCheckedChange={checked => AsyncStorage.setItem(settingKey, String(checked))}>
                    <Switch.Thumb animation="quicker"/>
                </Switch>

                <Text>Y</Text>
            </XStack>

        </XStack>
    )
}