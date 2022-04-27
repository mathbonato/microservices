import axios from "axios";

export class EmailSender{
    public send(email: string,subject : string, body : string ): void{
        axios.post("http://localhost:8080/email/enviar",{
            "sendTo": email,
            "subject":subject,
            "body": body
        }).then((res)=>console.log(res.data)).catch(console.error)
    }
}