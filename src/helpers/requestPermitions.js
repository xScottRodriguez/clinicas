/** @format */

export const requestPermissionMicrofone = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return stream;
  } catch (err) {
    throw new Error(err);
  }
};
