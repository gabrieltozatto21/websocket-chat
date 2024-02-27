import App from "./app";

const app = new App();

app.server.listen(3000, () =>{
    console.log("Aplicação iniciada na porta 3333.");
})