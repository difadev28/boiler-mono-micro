import React from "react";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  shadow?: "sm" | "md" | "lg" | "xl";
  padding?: "none" | "sm" | "md" | "lg";
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  shadow = "md",
  padding = "md",
}) => {
  const shadowStyles = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const classes = `bg-white rounded-lg ${shadowStyles[shadow]} ${paddingStyles[padding]} ${className}`;

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card;