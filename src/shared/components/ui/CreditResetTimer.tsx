import { useEffect, useState } from 'react';

type CreditsTimerProps = {
  resetDate: string;
};

const CreditsTimer = ({
  resetDate,
}: CreditsTimerProps) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const diff =
        new Date(resetDate).getTime() - Date.now();

      if (diff <= 0) {
        setTimeLeft('Refreshing...');
        return;
      }

      const hours = Math.floor(
        diff / (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (diff % (1000 * 60 * 60)) /
          (1000 * 60)
      );

      const seconds = Math.floor(
        (diff % (1000 * 60)) / 1000
      );

      setTimeLeft(
        `${hours}h ${minutes}m ${seconds}s`
      );
    };

    updateTimer();

    const interval = setInterval(
      updateTimer,
      1000
    );

    return () =>
      clearInterval(interval);
  }, [resetDate]);

  return <>{timeLeft}</>;
};

export default CreditsTimer;