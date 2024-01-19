export function formatMoney(num = 0) {
  if (num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return "0";
  }
}

export const isEmail = (emailAdress: string) => {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regex)) {
    return true;
  } else {
    return false;
  }
};

export const customFontLocation = {
  'space-grotesk-bold': require('../../assets/fonts/space_grotesk_bold.ttf'), // lg
  'space-grotesk-semi-bold': require('../../assets/fonts/space_grotesk_semi_bold.ttf'), // md
  'space-grotesk-medium': require('../../assets/fonts/space_grotesk_medium.ttf'), // sm
  'space-grotesk-regular': require('../../assets/fonts/space_grotesk_regular.ttf'), // xs
  'space-grotesk-light': require('../../assets/fonts/space_grotesk_light.ttf'), // xxs
  'sansita-italic': require('../../assets/fonts/sansita-italic.ttf'), // sansita-italic
};

export const JobStatus = {
  pending: {
    text: "Application Pending",
    color: "#FF802B",
    background: "#FFF0E6",
    update:
      "Your application is currently being reviewed, please wait for the status to change.",
  },
  sent: {
    text: "Application Sent",
    color: "#1472FF",
    background: "#F3F8FF",
    update:
      "Your application is yet to be reviewed, please hold and wait till it gets reviewed by the employer.",
  },
  rejected: {
    text: "Application Rejected",
    color: "#F92020",
    background: "#FFF3F3",
    update:
      "We regret to announce to you that your application has been rejected, we wish you the best in your journey.",
  },
  accepted: {
    text: "Application Accepted",
    color: "#05A308",
    background: "#F8FEF8",
    update:
      "Congratulations, your application has been accepted, please sit tight and wait for a message with information about the interview.",
  },
};
