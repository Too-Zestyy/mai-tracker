import { LinearGradient } from "@tamagui/linear-gradient";
import { PropsWithRef, useEffect, useRef, useState } from "react";
import { H3, Label, Switch, Text, XStack } from "tamagui";

type Props = {
    rating: number
};
  

export default function RatingBox({rating}: Props) {

    // Modify based on rating to match colour from game
    // let bgColour = "#333333";
    // let edgeColour = "#666666";


    // useEffect(() => {

    //     AsyncStorage.getItem(settingKey)
    //     .then(stored_setting => {
    //         setSetting(getStoredBooleanSettingValue(stored_setting));
    //     })
    //     .catch(e => {
    //         alert(`Failed to set a stored setting on a setting switch: ${e}`);
    //     })

    //     return () => {

    //     }

    // }, [settingKey, switchRef])

    return (
        <XStack alignItems="center" justifyContent="space-between">
            {/* <LinearGradient
                colors={["#ff0000", "#fffc00", "#00feff", "#a600ff", "#ff0000"]}
                locations={[0, 0.25, 0.5, 0.75, 1]}
                start={[0, 0.5]}
                end={[1, 0.5]}
                opacity={0.5}
                borderRadius="$2"
            > */}
                <H3 
                textAlign="center" 
                justifyContent="center"
                alignItems="center"
                bg="$purple4"
                borderColor="$purple8" 
                paddingVertical="$1"
                paddingHorizontal="$3"
                borderWidth="$1"
                borderRadius="$2"
                >
                    Rating: {rating/100}
                </H3>
            {/* </LinearGradient> */}
        </XStack>
    )
}