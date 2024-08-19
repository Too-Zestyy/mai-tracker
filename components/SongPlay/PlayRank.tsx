import { LinearGradient } from "@tamagui/linear-gradient";
import { PropsWithRef, useEffect, useRef, useState } from "react";
import { H5, useWindowDimensions } from "tamagui";
import { H1, H3, H4, H6, Label, Stack, Switch, Text, XStack, YStack } from "tamagui";

// TODO: Make type for a play object to improve readability
type Props = {
    rankData: RankObject
};

type RankObject = {
    achievement_formatted: string,
    rank: string
};


// TODO: Change UI colours to be both consitent and clear
function getRankColours(rank: string) {
    let border = "#bbbbbb";
    let bg = "#000000";
    let text = "#ffffff";

    const blue_ranks = ["F", "E", "D", "C", "B", "A", "AA", "AAA"];
    const silver_ranks = ["S", "S+"];
    const gold_ranks = ["SS", "SS+"];
    const rainbow_ranks = ["SSS", "SSS+"];

    if (blue_ranks.includes(rank)) {
        border = "#39eff3";
        bg = "#3a4beb";
        text = "$text";
    }

    else if (silver_ranks.includes(rank)) {
        border = "#39eff3";
        bg = "#3a4beb";
        text = "$text";
    }

    else if (gold_ranks.includes(rank)) {
        border = "#39eff3";
        bg = "#3a4beb";
        text = "$text";
    }

    else if (rainbow_ranks.includes(rank)) {
        border = "#39eff3";
        bg = "#3a4beb";
        text = "$yellow10";
    }

    return {border: border, bg: bg, text: text};
}
  

export default function PlayRank({rankData}: Props) {
    const { width, height } = useWindowDimensions();

    const {border, bg, text} = getRankColours(rankData.rank);

    return (
        <Stack 
        justifyContent="center" 
        alignItems="center" 
        // bg={bg}
        // borderColor={border}
        // borderWidth="$0.5"
        borderRadius="$2"
        paddingVertical="$1"
        paddingHorizontal="$2"

        >
            <LinearGradient
        width="$6"
        height="$6"
        borderRadius="$4"
        colors={['$red10', '$yellow10']}
        start={[0, 1]}
        end={[0, 0]}
      />
                <H4 color={text}>{rankData.achievement_formatted}%</H4>
                <H4 color={text}>{rankData.rank}</H4>
        </Stack>
    )
}