import { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
    return (
        <div className='w-4/5 mx-auto transition-all duration-300'>
            <div className={"p-8"}>
                {children}
            </div>
        </div>
    );
};

export default Container;