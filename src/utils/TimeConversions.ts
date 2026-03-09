//363 -> 06:03
export const formatSecondsToMMSS = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

// 1:01:02 -> 3662
export const timeToSeconds = (time: string) => {
  if (!time) return 0;

  const parts = time.split(":").map(Number);

  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  }

  if (parts.length === 2) {
    const [hours, minutes] = parts;
    return hours * 3600 + minutes * 60;
  }

  return 0;
};

//3662 -> 1:01:02
export const formatToHHMMSS = (totalSeconds: number) => {
  const safe = Math.max(0, totalSeconds);
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
};
