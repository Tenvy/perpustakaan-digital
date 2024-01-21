import { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  className?: string;
  [propName: string]: unknown;
}

const Modal = ({ children, className = '', ...others }: ModalProps) => {
    return (
        <div className={`bg-[#22222260] fixed h-screen w-full top-0 left-0 right-0 flex justify-center items-center ${className}`} {...others}>
            <div className='bg-white p-4 rounded-lg'>
                {children}
            </div>
        </div>
    )
}

export default Modal