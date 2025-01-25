import { ReactNode } from "react";

interface BoxProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Box({ children, className, onClick }: Readonly<BoxProps>) {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
}