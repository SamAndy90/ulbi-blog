import { replace, toUpper } from "ramda";

export function shakeCaseToWords(str: string) {
    return str.split("_").join(" ");
}

export function toTitleCase(str: string, toLower = true) {
    const targetStr = toLower ? str.toLowerCase() : str;
    return replace(/(^.|\s.)/g, toUpper, targetStr);
}

export function capitalize(str: string) {
    return replace(/^./, toUpper, str);
}
