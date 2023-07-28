import { AxiosError, CanceledError } from "axios";

import { isObj } from "./js-types";
import { shakeCaseToWords, toTitleCase } from "./string";

const StatusCodeMessage: {
    [key: number | string]: string;
} = {
    401: "You are not logged in.",
    403: "You are not authorized to perform this action.",
    404: "The requested resource was not found.",
    429: "You made too many requests. Please try again later.",
    500: "Something went wrong. Please try again later.",
    502: "Something went wrong. Please try again later.",
    503: "Something went wrong. Please try again later.",
};

export function getAxiosDRFErrorMessage(error: unknown) {
    if (error instanceof CanceledError) {
        return;
    }

    if (!(error instanceof AxiosError)) {
        return error instanceof Error ? error.message : undefined;
    }

    if (!error.response) return error.message;

    const data = error.response?.data;
    if (isObj(data)) {
        const messages: string[] = [];
        for (const [fieldName, fieldErrors] of Object.entries(data)) {
            let errorMessage = Array.isArray(fieldErrors) ? fieldErrors.join(", ") : "";

            if (!errorMessage) continue;
            if (!errorMessage.endsWith(".")) errorMessage += ".";

            if (fieldName === "non_field_errors") {
                messages.push(errorMessage);
                continue;
            }

            messages.push(`${toTitleCase(shakeCaseToWords(fieldName))}: ${errorMessage}`);
        }

        if (messages.length) return messages.join(" ");
    }

    const statusCodeMessage = StatusCodeMessage[error.response.status];
    if (statusCodeMessage) return statusCodeMessage;

    return error.message;
}

// 401: "Ви не ввійшли в систему.",
// 403: "Ви не маєте права виконувати цю дію.",
// 404: "Сторінку не знайдено.",
// 429: "Забагато запитів. Будь ласка, спробуйте пізніше.",
// 500: "Щось пішло не так. Будь ласка, спробуйте пізніше.",
// 502: "Щось пішло не так. Будь ласка, спробуйте пізніше.",
// 503: "Сервіс тимчасово недоступний. Будь ласка, спробуйте пізніше."