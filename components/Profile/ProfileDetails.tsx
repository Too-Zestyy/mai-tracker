import { LinearGradient } from "@tamagui/linear-gradient";
import { PropsWithRef, useEffect, useRef, useState } from "react";
import { H1, H3, Label, Switch, Text, XStack, YStack } from "tamagui";
import RatingBox from "./RatingBox";

type Props = {
    player: PlayerObject
};

type PlayerObject = {
    id: number,
    name: string,
    rating: number,
    level: number
};
  

export default function PlayerDetails({player}: Props) {

    return (
        <YStack justifyContent="center" alignItems="center">
            <H1>{player.name}</H1>
            <RatingBox rating={player.rating}></RatingBox>
            <H3>Level {player.level}</H3>
        </YStack>
    )
}