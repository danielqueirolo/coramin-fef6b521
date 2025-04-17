
const checkNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
};

export const scheduleNotification = async () => {
  const hasPermission = await checkNotificationPermission();
  if (!hasPermission) return;

  // Calculate time until next 10 PM
  const now = new Date();
  const next10PM = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    22, // 10 PM
    0,
    0
  );

  if (now > next10PM) {
    next10PM.setDate(next10PM.getDate() + 1);
  }

  const timeUntil10PM = next10PM.getTime() - now.getTime();

  setTimeout(() => {
    new Notification("Time to Meditate", {
      body: "Take a moment to connect with your inner peace",
      icon: "/favicon.ico"
    });
    // Schedule next day's notification
    scheduleNotification();
  }, timeUntil10PM);
};

