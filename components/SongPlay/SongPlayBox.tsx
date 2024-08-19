import { LinearGradient } from "@tamagui/linear-gradient";
import { PropsWithRef, useEffect, useRef, useState } from "react";
import { H5, Separator, useWindowDimensions } from "tamagui";
import { H1, H3, H4, H6, Label, Stack, Switch, Text, XStack, YStack } from "tamagui";
import PlayRank from "./PlayRank";

// TODO: Make type for a play object to improve readability
type Props = {
    playData: object
};

// type PlayObject = {
//     id: string,
//     name: string,
//     rating: number,
//     level: number
// };
  

export default function SongPlayBox({playData}: Props) {
    const { width, height } = useWindowDimensions();

    return (
        <Stack 
        justifyContent="center" 
        alignItems="center" 
        backgroundColor="$purple4" 
        borderColor="$purple8"
        borderWidth="$1"
        borderRadius="$2"
        paddingVertical="$3"
        paddingHorizontal="$3"
        width={width}>
            <XStack flexDirection="row" alignItems="center" justifyContent="space-between">
                {/* Song info */}
                <Stack flexDirection="column" alignItems="center">
                    <Stack
                    flexDirection="row" 
                    justifyContent="center">
                        <H4>{playData.song.name.en}</H4>
                        {/* <Separator height={100} vertical marginHorizontal={15} color="#ffffff" backgroundColor="#ffffff"></Separator> */}
                        <H6 marginHorizontal={5}>{playData.difficulty_level.label}</H6>
                        {/* <H4>{playData.achievement_formatted}% - {playData.rank}</H4> */}
                        {/* <PlayRank rankData={{achievement_formatted: playData.achievement_formatted, rank: playData.rank}}></PlayRank> */}
                    </Stack>
                    <Stack flexDirection="row">
                        <Text fontStyle='italic'>{playData.song.artist.en}</Text>
                    </Stack>
                </Stack>

                {/* Play info */}
                <Stack>
                    <PlayRank rankData={{achievement_formatted: playData.achievement_formatted, rank: playData.rank}}></PlayRank>
                </Stack>
            </XStack>
        </Stack>
    )
}