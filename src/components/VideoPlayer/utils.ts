
/**
 * Форматирует время из секунд в формат MM:SS
 * @param timeInSeconds - время в секундах
 * @returns форматированное время в виде строки MM:SS
 */
export const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
