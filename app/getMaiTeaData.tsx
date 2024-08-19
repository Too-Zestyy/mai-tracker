import axios from "axios";

async function getMaiTeaData() {
    let key;
    setStatus("loading");
    try {
        key = await AsyncStorage.getItem('mai-tea-key');
  
        if (key === null) {
            alert("Please save a key before attemping to use maiTea");
        }
      } catch (e) {
        alert("Failed to get API Key. Please try again later.");
    }
  
    if (key !== null) {
        try {
            const response = await axios.get('https://maitea.app/api/v1/plays', {
                headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                }
            });
  
            setMaiTeaData(response.data);
            setStatus('loaded');
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
  }

//   function getMaiTeaDataCB() {

//     let key;
//     setStatus("loading");
//     try {
//         key = AsyncStorage.getItem('mai-tea-key')
//         .then((key) {
//             if (key === null) {
//                 alert("Please save a key before attemping to use maiTea");
//             }
//         })
//       } catch (e) {
//         alert("Failed to get API Key. Please try again later.");
//     }

//     if (key !== null) {
//         try {
//             const response = axios.get('https://maitea.app/api/v1/plays', {
//                 headers: {
//                 'Authorization': `Bearer ${key}`,
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//                 }
//             })
//             .then((response) {
//                 setMaiTeaData(response.data);
//                 setStatus('loaded');
//             });
//         }
  
//         catch (err) {
//             // Error is Axios rejection error
//             if (err.response.status === 401) {
//                 alert("The API Key does not have access to the maiTea API - Has it been input correctly?");
//             }
//             else {
//                 alert(err);
//             }
//         }
//     }


//   }