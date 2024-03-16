sendcount = 0;
previoussender = "";
document.querySelectorAll('[role="main"] [role="row"]').forEach((e) => {
  try {
    const chattime = e.querySelector("span");
    if (chattime && chattime.textContent.length > 0) {
      if (
        chattime.textContent ==
          document.querySelector(".xxymvpz").textContent ||
        chattime.textContent == "Door jou verzonden" ||
        (chattime.textContent.includes(":") && /\d/.test(chattime.textContent))
      ) {
        if (chattime.textContent.includes(":")) {
          console.log(chattime.textContent);
          sendcount = 0;
        } else {
          if (previoussender == chattime.textContent) {
            sendcount += 1;
          } else {
            sendcount = 1;
            previoussender = chattime.textContent;
          }
          console.log(sendcount, previoussender);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
});
