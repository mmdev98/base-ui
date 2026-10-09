import * as React from "react";
import { cn } from "cn";
import { Form as BaseForm } from "@logic-ui/react/form";

export function Form({ className, ...props }: BaseForm.Props) {
  return (
    <BaseForm
      className={cn(
        "flex w-full max-w-3xs flex-col gap-5 sm:max-w-[20rem]",
        className,
      )}
      {...props}
    />
  );
}
