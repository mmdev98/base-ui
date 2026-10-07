import * as React from 'react';
import clsx from 'clsx';
import { RadioGroup as BaseRadioGroup } from '@mmdev98/base-ui-plus/radio-group';

export function RadioGroup<Value>({ className, ...props }: BaseRadioGroup.Props<Value>) {
  return (
    <BaseRadioGroup
      className={clsx(
        'flex w-full flex-row items-start gap-1 text-neutral-950 dark:text-white',
        className,
      )}
      {...props}
    />
  );
}
