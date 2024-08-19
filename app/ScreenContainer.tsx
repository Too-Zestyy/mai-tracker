import { Text, Stack, Theme } from "tamagui";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FooterButton } from "./FooterButton";
import React, { useState } from "react";
import { Contact, HelpCircle, Home, Settings } from "@tamagui/lucide-icons";
import { LinearGradient } from "@tamagui/linear-gradient";

type Props = {
  title: string;
  children: React.ReactNode;
};

const dark = {
  background: '#000',
  color: '#fff',
  // define any key to any string or number value
}

export const ScreenContainer = ({ title, children }: Props) => {
  const { top, bottom } = useSafeAreaInsets();
  const [selected, setSelected] = React.useState(0);

  let bottomTabColour = "#444444";
  const statusBarColour = "#301B3B";
  const appTitleColour = "#422154";
  const appBg = "#0c0910";

  const backgroundPicker = (selected: number) => {
    switch (selected) {
      case 0:
        return "#49A6F5"
      default:
        return "#8A46C7"
    }

  }

  return (
    <Theme name="dark_purple">
      <>
        <StatusBar backgroundColor={statusBarColour} style="light" />
        <Stack h={top*0.5} bg={appTitleColour} />
          <Stack
            bg={appTitleColour}
            py="$4"
            justifyContent="space-around"
            alignItems="center"
            w="100%"
          >
            <Text color="white" fontSize="$6" fontWeight="bold" onPress={() => setSelected(0)}>
              {title}
            </Text>
          </Stack>

        {/* </LinearGradient> */}

        <Stack flex={1} bg={appBg}>
          {/* Children is an array of each of the first-level children within the component */}
          { children[selected] }
        </Stack>
        {/* {["#222226", "#333339", "#6200ee"]} */}
        {/* {["#6B8ACC", "#CDD9BD", "#D2B582", "#975C85", "#D8B6EC", "#B4D0DB"]} */}
        {/* {["#222225", "#FAC731", "#D25D2A", "#DF1891", "#8A46C7", "#49A6F5"]} */}
        {/* <LinearGradient colors={["#222225", "#FAC731", "#D25D2A", "#DF1891", "#8A46C7", "#49A6F5"]} locations={[0, 0.025, 0.075, 0.2, 0.55, 1]}>  */}
          <Stack
            // {() => backgroundPicker(selected)}
            bg={appBg}
            alignItems="center"
            flexDirection="row"
            paddingBottom={bottom}
          >
            
            <FooterButton
              title="Home"
              icon={<Home size={selected === 0 ? "$2.5" : "$2"} color="$foreground" />}
              selected={selected === 0}
              onPress={() => setSelected(0)}
            />

            <FooterButton
              title="Settings"
              icon={<Settings size={selected === 1 ? "$2.5" : "$2"} color="$foreground" />}
              selected={selected === 1}
              onPress={() => setSelected(1)}
            />

            <FooterButton
              title="Help"
              icon={<HelpCircle size={selected === 2 ? "$2.5" : "$2"} color="$foreground" />}
              selected={selected === 2}
              onPress={() => setSelected(2)}
            />

            {/* <FooterButton
              title="Contact"
              icon={<Contact size="$2" color="$background" />}
              selected={selected === 3}
              onPress={() => setSelected(3)}
            /> */}
          </Stack>

      </>
    </Theme>
    
  );
};