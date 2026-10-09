import * as React from "react";
import { cn } from "cn";
import { Field } from "@logic-ui/react/field";

export function Root({ className, ...props }: Field.Root.Props) {
  return (
    <Field.Root
      className={cn("flex flex-col items-start gap-1", className)}
      {...props}
    />
  );
}

export function Label({ className, ...props }: Field.Label.Props) {
  return (
    <Field.Label
      className={cn(
        'text-sm font-bold text-neutral-950 has-[[role="checkbox"]]:flex has-[[role="checkbox"]]:items-center has-[[role="checkbox"]]:gap-2 has-[[role="checkbox"]]:font-normal has-[[role="radio"]]:flex has-[[role="radio"]]:items-center has-[[role="radio"]]:gap-2 has-[[role="radio"]]:font-normal has-[[role="switch"]]:flex has-[[role="switch"]]:items-center dark:text-white',
        className,
      )}
      {...props}
    />
  );
}

export function Description({ className, ...props }: Field.Description.Props) {
  return (
    <Field.Description
      className={cn(
        "text-sm text-neutral-600 dark:text-neutral-400",
        className,
      )}
      {...props}
    />
  );
}

export const Control = React.forwardRef<HTMLInputElement, Field.Control.Props>(
  function FieldControl(
    { className, ...props }: Field.Control.Props,
    forwardedRef: React.ForwardedRef<HTMLInputElement>,
  ) {
    return (
      <Field.Control
        ref={forwardedRef}
        className={cn(
          "h-8 w-full max-w-xs border border-neutral-950 bg-white px-2 text-sm any-pointer-coarse:text-base font-normal text-neutral-950 placeholder:text-neutral-500 focus:outline-2 focus:-outline-offset-1 focus:outline-neutral-950 dark:focus:outline-white dark:border-white dark:bg-neutral-950 dark:text-white dark:placeholder:text-neutral-400",
          className,
        )}
        {...props}
      />
    );
  },
);

export function Error({ className, ...props }: Field.Error.Props) {
  return (
    <Field.Error
      className={cn("text-sm text-red-700 dark:text-red-400", className)}
      {...props}
    />
  );
}

export function Item(props: Field.Item.Props) {
  return <Field.Item {...props} />;
}
