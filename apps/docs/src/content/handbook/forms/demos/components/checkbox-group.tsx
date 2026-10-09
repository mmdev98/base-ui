import * as React from "react";
import { cn } from "cn";
import { CheckboxGroup as BaseCheckboxGroup } from "@mmdev98/base-ui/checkbox-group";

export function CheckboxGroup({
  className,
  ...props
}: BaseCheckboxGroup.Props) {
  return (
    <BaseCheckboxGroup
      className={cn(
        "flex flex-col items-start gap-1 text-neutral-950 dark:text-white",
        className,
      )}
      {...props}
    />
  );
}
