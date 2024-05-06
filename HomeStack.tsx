import { useEffect, useState } from "react";
import { Button, Form, Input, Spinner, Stack, Text, Theme } from "tamagui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import ColouredSpinner from "./components/ColouredSpinner";

const saveMaiTeaKey = async (key: string) => {
    // alert(maiTeaKey);
      try {
        await AsyncStorage.setItem('mai-tea-key', key);
      } catch (e) {
        alert(e);
      }
}

const getMaiTeaKey = async () => {
    try {
      const value = await AsyncStorage.getItem('mai-tea-key');
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
  console.log("This logging came from the destructor for getting maiTea data (Home Page)");
}

export default function HomeStack() {
  // TODO: Add checks to see if an API Key has been set to reduce 401s
  // TODO: 401 also makes home hang at loading spinner - introduce a better handling (alert? replace text?)
    const [status, setStatus] = useState<'unloaded' | 'loading' | 'loaded'>('unloaded')
    const [maiTeaData, setMaiTeaData] = useState<Object>({});

    // Using an async function seems to break the destructor (Complains that the return value cannot be anything other than a function, maybe promise counts as an Object?)
    // See if using axios via callbacks could be a solution
    useEffect( () => {
      
      {
        setStatus("loading");
        try {
            AsyncStorage.getItem('maitea-key')
            .then((key) => {
                console.log(key);
                if (key === null) {
                    alert("Please save a key before attemping to use maiTea");
                }
                else{
                  try {
                    axios.get('https://maitea.app/api/v1/plays', {
                        headers: {
                        'Authorization': `Bearer ${key}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        }
                    })
                    .then((response) => {
                        setMaiTeaData(response.data);
                        setStatus('loaded');
                        setTimeout(() => setMaiTeaData({value: "this is dummy data to test live updates!"}), 5000)
                    });
                }
                catch (err) {
                  // Error is Axios rejection error
                  if (err.response.status === 401) {
                      alert("The API Key does not have access to the maiTea API - Has it been input correctly?");
                  }
                  else {
                      alert(err);
                  }
              }
        }
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
            { status === "unloaded" &&
              <Button onPress={() => {setStatus('loaded');}}>Swap to loaded (FIX)</Button>
            }
            { status === "loading" &&
              <>
                <ColouredSpinner size="large"></ColouredSpinner>
                <Text pt="$3">Hang tight, we're both waiting on maiTea here...</Text>
              </>
             }

             { status === "loaded" &&
             <Stack flex={1} justifyContent="center" alignItems="center">
              <Text pt="$1">{JSON.stringify(maiTeaData)}</Text>
              <Button onPress={() => setStatus("unloaded")}>Unload</Button>
             </Stack>
             

             }
        </Stack>
    )
}