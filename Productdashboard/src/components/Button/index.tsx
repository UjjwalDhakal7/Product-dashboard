import { MouseEventHandler, ReactNode } from "react";
import './index.css'
export interface ButtonProps {
    children : ReactNode,
    onClick: MouseEventHandler<HTMLButtonElement>;
    classname : string
}
const Button = ({children, onClick, classname}:ButtonProps ) => {
  return (
    <button onClick={onClick} className={classname}>
      {children}
    </button>
  );
};

export default Button;
