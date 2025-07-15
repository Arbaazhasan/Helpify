
export const catchAsyncError = (passedFunciton) => (req, res, next) => {

    Promise.resolve(passedFunciton(req, res, next)).catch(next);

}