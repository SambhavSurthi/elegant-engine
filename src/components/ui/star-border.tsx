"use client";
import { cn } from "@/lib/utils";
import { ElementType, ComponentPropsWithoutRef } from "react";

interface StarBorderProps<T extends ElementType> {
  as?: T;
  color?: string;
  speed?: string;
  className?: string;
  children: React.ReactNode;
}

export function StarBorder<T extends ElementType = "button">({
  as,
  className,
  color,
  speed = "6s",
  children,
  ...props
}: StarBorderProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof StarBorderProps<T>>) {
  const Component = as || "button";
  const defaultColor = color || "red";

  return (
    <Component 
      className={cn(
        "relative inline-block py-[1px] overflow-hidden rounded-[20px]",
        className
      )} 
      {...props}
    >
      <div
        className={cn(
          "absolute w-[500%] h-[100%] bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        )}
        style={{
          background: `radial-gradient(circle, ${defaultColor || '#3b82f6'}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className={cn(
          "absolute w-[500%] h-[100%] top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        )}
        style={{
          background: `radial-gradient(circle, ${defaultColor || '#3b82f6'}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className={cn(
        "relative z-1 border text-foreground text-center text-sm py-2 px-4 rounded-[20px]",
        "bg-gradient-to-b from-background/95 to-muted/95 border-primary/60",
        "dark:from-background dark:to-muted dark:border-primary/80",
        "backdrop-blur-sm shadow-lg hover:shadow-primary/20 transition-all duration-300"
      )}>
        {children}
      </div>
    </Component>
  );
}