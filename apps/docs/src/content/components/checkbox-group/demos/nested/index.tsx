"use client";
import * as React from "react";
import { Checkbox } from "@mmdev98/base-ui/checkbox";
import { CheckboxGroup } from "@mmdev98/base-ui/checkbox-group";

const groupClassName =
  "ml-4 flex flex-col items-start gap-1 text-neutral-950 dark:text-white";
const itemClassName = "flex items-center gap-2 text-sm font-normal";
const checkboxClassName =
  "flex size-4 shrink-0 items-center justify-center border rounded-none p-0 border-neutral-950 bg-white text-white dark:border-white dark:bg-neutral-950 dark:text-neutral-950 data-checked:bg-neutral-950 data-checked:text-white dark:data-checked:bg-white dark:data-checked:text-neutral-950 data-indeterminate:bg-neutral-950 data-indeterminate:text-white dark:data-indeterminate:bg-white dark:data-indeterminate:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white";
const indicatorClassName = "flex data-unchecked:hidden";

const mainPermissions = ["view-dashboard", "manage-users", "access-reports"];
const userManagementPermissions = [
  "create-user",
  "edit-user",
  "delete-user",
  "assign-roles",
];

export default function PermissionsForm() {
  const id = React.useId();
  const [mainValue, setMainValue] = React.useState<string[]>([]);
  const [managementValue, setManagementValue] = React.useState<string[]>([]);

  return (
    <CheckboxGroup
      aria-labelledby={id}
      value={mainValue}
      onValueChange={(value) => {
        if (value.includes("manage-users")) {
          setManagementValue(userManagementPermissions);
        } else if (
          managementValue.length === userManagementPermissions.length
        ) {
          setManagementValue([]);
        }
        setMainValue(value);
      }}
      allValues={mainPermissions}
      className={groupClassName}
    >
      <label className={`${itemClassName} -ml-4`} id={id}>
        <Checkbox.Root
          className={checkboxClassName}
          parent
          indeterminate={
            managementValue.length > 0 &&
            managementValue.length !== userManagementPermissions.length
          }
        >
          <Checkbox.Indicator
            className={indicatorClassName}
            render={(props, state) => (
              <span {...props}>
                {state.indeterminate ? <HorizontalRuleIcon /> : <CheckIcon />}
              </span>
            )}
          />
        </Checkbox.Root>
        User Permissions
      </label>

      <label className={itemClassName}>
        <Checkbox.Root value="view-dashboard" className={checkboxClassName}>
          <Checkbox.Indicator className={indicatorClassName}>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        View Dashboard
      </label>

      <label className={itemClassName}>
        <Checkbox.Root value="access-reports" className={checkboxClassName}>
          <Checkbox.Indicator className={indicatorClassName}>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Access Reports
      </label>

      <CheckboxGroup
        aria-labelledby="manage-users-caption"
        className={groupClassName}
        value={managementValue}
        onValueChange={(value) => {
          if (value.length === userManagementPermissions.length) {
            setMainValue((prev) =>
              Array.from(new Set([...prev, "manage-users"])),
            );
          } else {
            setMainValue((prev) => prev.filter((v) => v !== "manage-users"));
          }
          setManagementValue(value);
        }}
        allValues={userManagementPermissions}
      >
        <label className={`${itemClassName} -ml-4`} id="manage-users-caption">
          <Checkbox.Root className={checkboxClassName} parent>
            <Checkbox.Indicator
              className={indicatorClassName}
              render={(props, state) => (
                <span {...props}>
                  {state.indeterminate ? <HorizontalRuleIcon /> : <CheckIcon />}
                </span>
              )}
            />
          </Checkbox.Root>
          Manage Users
        </label>

        <label className={itemClassName}>
          <Checkbox.Root value="create-user" className={checkboxClassName}>
            <Checkbox.Indicator className={indicatorClassName}>
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          Create User
        </label>

        <label className={itemClassName}>
          <Checkbox.Root value="edit-user" className={checkboxClassName}>
            <Checkbox.Indicator className={indicatorClassName}>
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          Edit User
        </label>

        <label className={itemClassName}>
          <Checkbox.Root value="delete-user" className={checkboxClassName}>
            <Checkbox.Indicator className={indicatorClassName}>
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          Delete User
        </label>

        <label className={itemClassName}>
          <Checkbox.Root value="assign-roles" className={checkboxClassName}>
            <Checkbox.Indicator className={indicatorClassName}>
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          Assign Roles
        </label>
      </CheckboxGroup>
    </CheckboxGroup>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <path d="m2.5 8.5 4 4 7-9" />
    </svg>
  );
}

function HorizontalRuleIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
      strokeWidth={1}
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <line
        x1="3"
        y1="12"
        x2="21"
        y2="12"
        stroke="currentColor"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
