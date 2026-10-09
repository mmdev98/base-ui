"use client";
import { useRender } from "@logic-ui/react/use-render";
import { mergeProps } from "@logic-ui/react/merge-props";

type TextProps = useRender.ComponentProps<"p">;

function Text(props: TextProps) {
  const { render, ...otherProps } = props;

  const element = useRender({
    defaultTagName: "p",
    render,
    props: mergeProps<"p">(
      {
        className:
          "text-sm leading-4 text-neutral-950 dark:text-white [strong&]:font-bold",
      },
      otherProps,
    ),
  });

  return element;
}

export default function ExampleText() {
  return (
    <div>
      <Text>Text component rendered as a paragraph tag</Text>
      <Text render={<strong />}>Text component rendered as a strong tag</Text>
    </div>
  );
}
