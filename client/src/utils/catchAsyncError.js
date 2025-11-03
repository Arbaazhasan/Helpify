import toast from "react-hot-toast";
import { ErrorHandler } from "./errorHandler";

export const catchAsyncError = (passedFunction) => async (...args) => {
    try {
        await passedFunction(...args);
    } catch (error) {
        console.error("Error caught in wrapper:", error);

        if (error instanceof ErrorHandler) {
            toast.error(error.message);
            return;
        }

        if (error.response?.data?.message) {
            toast.error(error.response.data.message);
            return;
        }

        toast.error("Something went wrong! Please try again later.");
    }
};
