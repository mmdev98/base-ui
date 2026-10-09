import * as React from "react";
import { cn } from "cn";
import { RadioGroup as BaseRadioGroup } from "@mmdev98/base-ui/radio-group";

export function RadioGroup<Value>({
  className,
  ...props
}: BaseRadioGroup.Props<Value>) {
  return (
    <BaseRadioGroup
      className={cn(
        "flex w-full flex-row items-start gap-1 text-neutral-950 dark:text-white",
        className,
      )}
      {...props}
    />
  );
}
