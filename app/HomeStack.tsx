import { useEffect, useState } from "react";
import { Button, Form, H1, H2, H3, H5, Input, Separator, SizableText, Spinner, Stack, Tabs, Text, Theme, useWindowDimensions, XStack, YStack } from "tamagui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import ColouredSpinner from "../components/ColouredSpinner";
import { DEFAULT_KEY } from "./constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import appConfig from "./tamagui.config";
import RatingBox from "../components/Profile/RatingBox";
import { FIRST_PAGE_PLAYS_KEY } from "./storageKeys";
import PlayerDetails from "../components/Profile/ProfileDetails";
import SongPlayBox from "../components/SongPlay/SongPlayBox";

// const saveMaiTeaKey = async (key: string) => {
//     // alert(maiTeaKey);
//       try {
//         await AsyncStorage.setItem('mai-tea-key', key);
//       } catch (e) {
//         alert(e);
//       }
// }

// const getMaiTeaKey = async () => {
//     try {
//       const value = await AsyncStorage.getItem('mai-tea-key');
//       if (value !== null) {
//         return value;
//       }
//       else {
//         return "";
//       }
//     } catch (e) {
//       alert(e);
//       return "";
//     }
// }

// async function getMaiTeaData() {
//   let key;
//   setStatus("loading");
//   try {
//       key = await AsyncStorage.getItem('mai-tea-key');

//       if (key === null) {
//           alert("Please save a key before attemping to use maiTea");
//       }
//     } catch (e) {
//       alert("Failed to get API Key. Please try again later.");
//   }

//   if (key !== null) {
//       try {
//           const response = await axios.get('https://maitea.app/api/v1/plays', {
//               headers: {
//               'Authorization': `Bearer ${key}`,
//               'Content-Type': 'application/json',
//               'Accept': 'application/json',
//               }
//           });

//           setMaiTeaData(response.data);
//           setStatus('loaded');
//       }

//       catch (err) {
//           // Error is Axios rejection error
//           if (err.response.status === 401) {
//               alert("The API Key does not have access to the maiTea API - Has it been input correctly?");
//           }
//           else {
//               alert(err);
//           }
//       }
//   }
// }

function dummyDestroy() {
  // console.log("This logging came from the destructor for getting maiTea data (Home Page)");
}

export default function HomeStack() {
  // TODO: Add checks to see if an API Key has been set to reduce 401s
  // TODO: 401 also makes home hang at loading spinner - introduce a better handling (alert? replace text?)
    const [status, setStatus] = useState<'loading' | 'updating' | 'loaded' | 'rejected'>('loading');
    const [maiTeaData, setMaiTeaData] = useState<Object>({});

    const { width, height } = useWindowDimensions();
    const { top, bottom } = useSafeAreaInsets();

    // Using an async function seems to break the destructor (Complains that the return value cannot be anything other than a function, maybe promise counts as an Object?)
    // See if using axios via callbacks could be a solution
    useEffect( () => {
      
      {
        setStatus("loading");
        try {
          AsyncStorage.getItem(FIRST_PAGE_PLAYS_KEY)
          .then(storedPlays => {
            if (!(storedPlays === null)) {
              setMaiTeaData(JSON.parse(storedPlays));
              setStatus("updating");
            }
            AsyncStorage.getItem('maitea-key')
            .then((key) => {
                // console.log(key);
                if (key === null || key === DEFAULT_KEY) {
                    setStatus('rejected');
                }
                else {
                  try {
                    axios.get('https://maitea.app/api/v1/plays', {
                        headers: {
                        'Authorization': `Bearer ${key}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        }
                    })
                    .then((response) => {
                        setMaiTeaData(response.data.data);
                        AsyncStorage.setItem(FIRST_PAGE_PLAYS_KEY, JSON.stringify(response.data.data));
                        setStatus('loaded');
                        // setTimeout(() => setMaiTeaData({value: "this is dummy data to test live updates!"}), 5000)
                        // setTimeout(() => setStatus("loaded"), 5000)
                    })
                    .catch(err => {
                      if (err.response.status === 401) {
                        setStatus('rejected');
                      }
                      else {
                        alert(err);
                      }
                    });
                }
                catch (err) {
                  // Error is Axios rejection error
                      alert(err);
                }
              }
            })
          })
          .catch(e => {
            alert(`Error when attempting to get cached plays: ${e}`);
          })
            
          // TODO: Clean up callback indentation/readability, and ensure catches are correct. Once cached responses are added, 
          // modify function to check storage, and use it if it exists while getting new data. 
          // Line 103 (timeout) proves data can be changed in useEffect to refresh the page instantly, so this approach will work *within useEffect*
          } catch (e) {
            alert("Failed to get API Key. Please try again later.");
        }
      };

      return dummyDestroy;
    }, [setStatus, setMaiTeaData]);

    // getMaiTeaData();

    return (
      
        <Stack flex={1} justifyContent="center" alignItems="center">
            {/* <Text>Home Page</Text> */}
            { status === "loading" &&
              <>
                <ColouredSpinner size="large"></ColouredSpinner>
                <Text pt="$3">Hang tight, we're both waiting on maiTea here...</Text>
              </>
             }

             { (status === "loaded" || status === "updating") &&
             <Stack flex={1} justifyContent="center" alignItems="center">
              {
                status === "updating" &&
                <XStack width={width} flexDirection="row" justifyContent="center" alignItems="center">
                  <Text>Checking for anything new...</Text>
                  <Separator alignSelf="stretch" vertical marginHorizontal={15}></Separator>
                  <ColouredSpinner size="small"></ColouredSpinner>
                </XStack>
              }
              {/* <Text pt="$1">{JSON.stringify(maiTeaData)}</Text> */}
              {/* <Button onPress={() => setStatus("unloaded")}>Unload</Button> */}

              <Tabs 
                defaultValue="profile"
                width={width}
                // This prop needs to be updated to be more readable - reduce by space not taken by header of app being smaller, and include space for loading message if necessary
                height={height - top - bottom - appConfig.fonts.heading.size[12] - (appConfig.fonts.heading.size[5] * Number(status === "updating")) * 1.25}
                // Originally used appConfig.fonts.heading.size[12] and appConfig.fonts.heading.size[5]
                orientation="horizontal"
                flexDirection="column"
                alignItems="center"
                borderRadius="$4"
                borderWidth="$0.25"
              >
                <Tabs.List>
                  <Tabs.Tab value="profile" flex={1}>
                    <SizableText>Profile</SizableText>
                  </Tabs.Tab>
                  <Tabs.Tab value="recent-plays" flex={1}>
                    <SizableText>Recent Plays</SizableText>
                  </Tabs.Tab>
                </Tabs.List>
                <Separator width={width} />
                <Tabs.Content value="profile">
                  {/* Player Profile */}
                  <Stack alignItems="center">
                    <PlayerDetails player={maiTeaData[0].player}></PlayerDetails>
                    <SongPlayBox playData={maiTeaData[0]}></SongPlayBox>
                    <Text>{JSON.stringify(maiTeaData[0])}</Text>
                    { Object.keys(maiTeaData[0]).map((key, index) => {
                      return <Text key={index}>{key}</Text>
                    }) 
                    }
                  </Stack>
                </Tabs.Content>
                <Tabs.Content value="recent-plays">
                  <H5>Tab 2</H5>
                </Tabs.Content>
              </Tabs>
             </Stack>
             

             }
             {
              status === "rejected" && 
              <Stack>
                <Text textAlign="center">The saved API key doesn't seem to work... Are you sure it's right? (If you haven't added it yet, head over to settings!)</Text>
              </Stack>
             }
        </Stack>
    )
}