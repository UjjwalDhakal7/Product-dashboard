import { ReactNode } from "react";
import './index.css';
import Sidebar from "#components/Sidebar";

interface ContainerProps {
    children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
    return (
        <div className="wrapper">
            <div className="container">
                <header><h1>Dashboard</h1></header>
                <div className="main-wrap">
                    <div className="sidebar"><Sidebar /></div>
                    <div className="main">
                        {children}
                    </div>
                </div>
                {/* <footer></footer> */}
        </div>
        </div>
    );
};

export default Container;