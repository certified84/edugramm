export const BASEURL = `https://9ba6-102-215-57-54.ngrok-free.app`;

export const sendPost = async (post: string) => {
    const response = await fetch(`${BASEURL}/api/task`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: post }),
    });
  
    if (![200, 400].includes(response.status)) {
      return {
        status: "error",
        message: "Server temporarily unavailable, check your network & try again",
        data: {},
      };
    }

    const data = await response.json();
  
    // console.log([], data);
  
    return {
      status: response.status === 200 ? "success" : "error",
      message: data.message,
      error: data.error,
      data: data.result,
    };
}

export const getResult = async () => {
    const response = await fetch(`${BASEURL}/api/result`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
  
    if (![200, 400].includes(response.status)) {
      return {
        status: "error",
        message: "Server temporarily unavailable, check your network & try again",
        data: [],
      };
    }
}

// export const getResult = async (identifier: string) => {
//     const response = await fetch(`${BASEURL}/api/result`, {
//       method: "GET",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify({ identifier: identifier }),
//     });
  
//     if (![200, 400].includes(response.status)) {
//       return {
//         status: "error",
//         message: "Server temporarily unavailable, check your network & try again",
//         data: {},
//       };
//     }
// }