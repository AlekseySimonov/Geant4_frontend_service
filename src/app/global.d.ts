declare module '*.module.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export default classNames;
}


declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'

