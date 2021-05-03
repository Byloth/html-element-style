export default class HTMLElementStyleException extends Error { }

export class PropertyException extends HTMLElementStyleException { }
export class InvalidPropertyException extends PropertyException { }
