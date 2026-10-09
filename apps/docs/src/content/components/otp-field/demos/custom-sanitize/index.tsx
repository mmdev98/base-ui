"use client";
import * as React from "react";
import { cn } from "cn";
import { OTPField } from "@mmdev98/base-ui/otp-field";
import { useInvalidFeedback } from "./useInvalidFeedback";

const CODE_LENGTH = 6;

const SHAKE_KEYFRAMES: Keyframe[] = [
  { transform: "translateX(0)" },
  { transform: "translateX(-4px)", offset: 0.25 },
  { transform: "translateX(4px)", offset: 0.75 },
  { transform: "translateX(0)" },
];

function normalizeRecoveryCode(value: string) {
  return value.toUpperCase();
}

export default function OTPFieldCustomNormalizeDemo() {
  const id = React.useId();
  const descriptionId = `${id}-description`;
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const {
    activeInvalidIndex,
    handleValueChange,
    handleValueInvalid,
    invalidPulse,
    setFocusedIndex,
    statusMessage,
  } = useInvalidFeedback();

  // Shake the input on every rejected entry. Each pulse starts a new animation,
  // so repeated invalid input replays it.
  React.useEffect(() => {
    if (invalidPulse === 0) {
      return;
    }
    inputRefs.current[activeInvalidIndex]?.animate(SHAKE_KEYFRAMES, {
      duration: 180,
      easing: "ease-in-out",
    });
  }, [invalidPulse, activeInvalidIndex]);

  return (
    <div className="flex w-full max-w-80 flex-col items-start gap-1">
      <label
        htmlFor={id}
        className="text-sm font-bold text-neutral-950 dark:text-white"
      >
        Recovery code
      </label>
      <OTPField.Root
        id={id}
        length={CODE_LENGTH}
        validationType="alphanumeric"
        normalizeValue={normalizeRecoveryCode}
        onValueChange={handleValueChange}
        onValueInvalid={handleValueInvalid}
        aria-describedby={descriptionId}
        className="flex w-full gap-2"
      >
        {Array.from({ length: CODE_LENGTH }, (_, index) => (
          <OTPField.Input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            className={cn(
              "m-0 h-10 w-10 rounded-none border bg-white dark:bg-neutral-950 text-center font-inherit text-base font-normal text-neutral-950 dark:text-white focus:outline-2 focus:-outline-offset-1",
              activeInvalidIndex === index
                ? "border-red-700 outline-2 -outline-offset-1 outline-red-700 dark:border-red-400 dark:outline-red-400"
                : "border-neutral-950 dark:border-white focus:outline-neutral-950 dark:focus:outline-white",
            )}
            aria-label={
              index === 0
                ? undefined
                : `Character ${index + 1} of ${CODE_LENGTH}`
            }
            onFocus={() => {
              setFocusedIndex(index);
            }}
          />
        ))}
      </OTPField.Root>
      <p
        id={descriptionId}
        className="m-0 text-sm text-neutral-600 dark:text-neutral-400"
      >
        Letters and digits only. Letters are converted to uppercase.
      </p>
      <span aria-live="polite" className="sr-only">
        {statusMessage}
      </span>
    </div>
  );
}
