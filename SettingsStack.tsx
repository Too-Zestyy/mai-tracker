import React, { useEffect, useRef, useState } from "react";
import { Adapt, Button, Checkbox, Form, H2, H4, Input, Label, Select, Separator, Sheet, Slider, Spinner, Stack, Switch, Text, Theme, useWindowDimensions, XStack, YStack } from "tamagui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeySaveAlertDialog } from "./components/KeySaveAlertDialog";
import { DialogInstance } from "./components/KeySaveDialog";
import { Check, Italic } from "@tamagui/lucide-icons";

import {saveMaiTeaKey, getMaiTeaKey} from "./settings/storedSettings";
import { getStoredBooleanSettingValue } from "./settings/settingsChecks";
import BooleanSettingSwitch from "./components/SettingsStack/BooleanSettingSwitch";
import ColouredSpinner from "./components/ColouredSpinner";

export default function SettingsStack() {
    // TODO: use callbacks for `UseEffect()` so key shows up when going to settings without interaction (like typing in the key box)
    // TODO: Look into adding a ref to the switch's tracking of a setting, and making the settings stack wait for the switch to get them - keeps getting settings to only the switch
    
    // TODO NEW: `useEffect()` can fire when a reactive dependency updates: https://react.dev/reference/react/useEffect#specifying-reactive-dependencies
    // Look into using this to get a child component's state, and listen for a change (which then would fire useEffect and use `setLoaded()`) 
    // Possible source for child state: https://react.dev/learn/sharing-state-between-components

    // https://stackoverflow.com/questions/27864951/how-to-access-a-childs-state-in-react
    // https://stackoverflow.com/questions/27864951/how-to-access-a-childs-state-in-react/27875018#27875018
    const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off')

    const [loaded, setLoaded] = useState<boolean>(false);

    const [savedMaiTeaKey, setSavedMaiTeaKey] = useState(getMaiTeaKey);
    const [maiTeaKey, setMaiTeaKey] = useState("");

    const [cachedProfile, setCachedProfile] = useState<boolean>(false);
    const [cachedHistory, setCachedHistory] = useState<boolean>(false);

    let cached_profile = false;

    useEffect(() => {
      AsyncStorage.getItem("settings-cache-profile-enabled")
      .then(profile_setting => {
        setCachedProfile(getStoredBooleanSettingValue(profile_setting)); 
        AsyncStorage.getItem("settings-cache-history-enabled")
        .then(history_setting => {
          setCachedHistory(getStoredBooleanSettingValue(history_setting)); 
          setLoaded(true);
        })
      })

        if (status === 'submitting') {
            // Code triggered on form submit - add API save here
            saveMaiTeaKey(maiTeaKey);
            setSavedMaiTeaKey(getMaiTeaKey);

            const timer = setTimeout(() => setStatus('off'), 1)

            return () => {
                clearTimeout(timer)
            }
        }

    }, [status, cached_profile])

    // const ref = useRef(null);
    const { width, height } = useWindowDimensions();
      
    return (
      <>
      {!loaded &&
      <Stack flex={1} justifyContent="center" alignItems="center">
        <ColouredSpinner size="large"></ColouredSpinner>
        <Text pt="$3">Making sure your settings are *just* as you left them...</Text>
      </Stack>
      }

      {loaded &&
        <>
          <H2 paddingTop="$3" textAlign="center">Settings</H2>
            <Stack flex={1} justifyContent="center" alignItems="center">

                <Form onSubmit={() => null} alignItems="center">
                  <H4 textAlign="center">Caching</H4>

                  <BooleanSettingSwitch label="Cache profile details: " settingKey="settings-cache-profile-enabled" startingValue={cachedProfile} width={width}></BooleanSettingSwitch>
                  <BooleanSettingSwitch label="Cache song history: " settingKey="settings-cache-history-enabled" startingValue={cachedHistory} width={width}></BooleanSettingSwitch>

                  {/* <XStack width={width*0.75} alignItems="center" justifyContent="space-between">
                    <Label htmlFor="Check1">Cache profile details: </Label>

                    <XStack width={width*0.27} justifyContent="space-between">
                      <Text>N</Text>
                      <Switch size="$2" id="Check1" defaultChecked={cachedProfile} onCheckedChange={checked => AsyncStorage.setItem("settings-cache-profile-enabled", String(checked))}>
                        <Switch.Thumb animation="quicker"/>
                      </Switch>
                      <Text>Y</Text>
                    </XStack>
                  </XStack> */}

                  {/* <XStack width={width*0.75} alignItems="center" justifyContent="space-between">
                    <Label htmlFor="Check2">Cache song history: </Label>

                    <XStack width={width*0.27} justifyContent="space-between">
                      <Text>N</Text>
                      <Switch size="$2" id="Check2">
                        <Switch.Thumb animation="quicker"/>
                      </Switch>
                      <Text>Y</Text>
                    </XStack>
                  </XStack> */}

                  <XStack width={width*0.75} alignItems="center" justifyContent="space-between">
                    <Label htmlFor="Dropdown">History pages to cache: </Label>
                    <YStack>
                      <Slider size="$1" width="$10" defaultValue={[50]} max={100} step={1} >
                        {/* <CustomSliderTrack> */}
                          <Slider.TrackActive />
                        {/* </CustomSliderTrack> */}
                        <Slider.Thumb circular index={0} borderColor="$white0" />
                      </Slider>
                      <Text>Slider value here</Text>
                    </YStack>

                    {/* <Select defaultValue="">
                      <Select.Trigger>
                        <Select.Value placeholder="Search..." />
                      </Select.Trigger>

                      <Adapt when="sm" platform="touch">
                        <Sheet>
                          <Sheet.Frame>
                            <></>
                          </Sheet.Frame>
                          <Sheet.Overlay />
                        </Sheet>
                      </Adapt>

                      <Select.Content>
                        <Select.ScrollUpButton />
                        <Select.Viewport>
                          <Select.Group>
                            <Select.Label />
                            <Select.Item value="1" index={0}>
                              <Select.ItemText />
                            </Select.Item>
                          </Select.Group>
                        </Select.Viewport>
                        <Select.ScrollDownButton />
                      </Select.Content>
                    </Select> */}

                  </XStack>
                </Form>

              <Separator width="$20" marginVertical="$2" />

              <H4 textAlign="center" paddingBottom="$2">API Usage</H4>
              <Form onSubmit={() => setStatus('submitting')} gap="$2">
                  {/* <Text>maiTea API Key:</Text> */}
                  <Input flex={1} textAlign="center" size="$2" maxHeight={height * .1} width={width * .8} placeholder={"Write or paste your maiTea API Key here to get your data!"} onChangeText={setMaiTeaKey} />

                  <Form.Trigger asChild>
                      <Button icon={status === 'submitting' ? () => <Spinner /> : undefined}>Save API Key</Button>
                  </Form.Trigger>
                  {/* Since AsyncStorage returns a rpomise based function, the result we pull is an intermediate object - the value is in the key `_j` */}
                  <Text textAlign="center" paddingTop="$1">Saved maiTea API key: {"\n"}{savedMaiTeaKey["_j"]}</Text>
                  
              </Form>
            </Stack>
      </>
      }
      </>
          
    )
}