declare module '*.module.css' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module "*.module.scss" {
	const classNames: Record<string, string>;
	export = classNames;
}


declare module "*.css" {
	const classNames: { [key: string]: string };
	export default classNames;
}


declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'