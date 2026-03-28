"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Counter({
  target,
  suffix = "",
  prefix = "",
  duration = 1.5,
  className,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });
  const [display, setDisplay] = useState("0");

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 50,
    damping: 20,
    duration: duration,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, target, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      const rounded =
        target % 1 !== 0 ? latest.toFixed(1) : Math.round(latest).toString();
      setDisplay(rounded);
    });
    return unsubscribe;
  }, [spring, target]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
