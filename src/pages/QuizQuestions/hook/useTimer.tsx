import React, { useEffect, useState, useRef } from "react";

export function useTimer(duration: number) {
  const [seconds, setSeconds] = useState<number>(duration);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null | number>(null);

  function start() {
    timerRef.current = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);

    setIsRunning(true);
  }

  function stop() {
    clearInterval(timerRef.current as number);
    setSeconds(duration);
    setIsRunning(false);
  }

  useEffect(() => {
    return () => timerRef && clearInterval(timerRef.current as number);
  }, []);

  return {
    start,
    stop,
    isRunning,
    seconds,
  };
}
