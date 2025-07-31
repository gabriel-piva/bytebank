import { cn } from "@/lib/utils";
import * as React from "react";

const RadioGroupContext = React.createContext<{
  value: string;
  onChange: (value: string) => void;
} | null>(null);

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, ...props }, ref) => {
    return (
      <RadioGroupContext.Provider value={{ value, onChange: onValueChange }}>
        <div
          ref={ref}
          className={cn("flex flex-col gap-2", className)}
          role="radiogroup"
          {...props}
        />
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

interface RadioGroupItemProps extends React.ComponentProps<"input"> {
  value: string;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, id, children, ...props }, ref) => {
    const context = React.useContext(RadioGroupContext);
    if (!context) {
      throw new Error("RadioGroupItem must be used within a RadioGroup");
    }

    const isChecked = context.value === value;

    return (
      <div className="flex items-center space-x-2">
        <input
          ref={ref}
          type="radio"
          id={id}
          value={value}
          checked={isChecked}
          onChange={() => context.onChange(value)}
          className={cn(
            "peer border-input bg-background text-primary h-4 w-4 shrink-0 rounded-full border",
            "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        {children && (
          <label
            htmlFor={id}
            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {children}
          </label>
        )}
      </div>
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
