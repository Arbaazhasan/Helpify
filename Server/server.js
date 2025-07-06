
const server = (app, PORT) => {
    app.listen(PORT, (req, res) => {
        console.log(`Server runing on port : ${PORT}`)
    });

};
export default server;