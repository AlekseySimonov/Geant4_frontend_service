declare module '*.module.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export default classNames;
}
declare module '*.css';

declare module "katex";
declare module 'react-katex' {
    import * as React from 'react';

    export interface MathProps {
        math: string;
        errorColor?: string;
        renderError?: (error: Error) => React.ReactNode;
    }

    export const InlineMath: React.FC<MathProps>;
    export const BlockMath: React.FC<MathProps>;
}

declare module '*.webp'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'

