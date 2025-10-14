import classNames from 'classnames'; 
import { RefObject } from 'react';

type InputProps = {
    placeholder: string;
    reference: RefObject<HTMLInputElement | null>;
    classy: string;
    type?: string;
};

export function Input({ placeholder, reference, classy, type = "text" }: InputProps) {
    return (
        <div>
            <input 
                ref={reference} 
                placeholder={placeholder} 
                type={type} 
                className={classNames('px-4 py-2 border rounded m-2', classy)} 
            />
        </div>
    );
}