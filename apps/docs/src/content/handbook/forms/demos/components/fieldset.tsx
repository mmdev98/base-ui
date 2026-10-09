import * as React from "react";
import { cn } from "cn";
import { Fieldset } from "@logic-ui/react/fieldset";

export function Root(props: Fieldset.Root.Props) {
  return <Fieldset.Root {...props} />;
}

export function Legend({ className, ...props }: Fieldset.Legend.Props) {
  return (
    <Fieldset.Legend
      className={cn(
        "text-sm font-bold text-neutral-950 dark:text-white",
        className,
      )}
      {...props}
    />
  );
}
