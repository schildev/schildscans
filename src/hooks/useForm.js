import { useState } from "react";
import { useImmer } from "use-immer";

export const useForm = function(initialValue, url) {
    const [message, updateMessage] = useImmer(initialValue);
    const [error, setError] = useImmer({error:null, success:null});
    const [pending, setPending] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        if(pending){
            return null;
        }
        setPending(true);
        try{
            const request = await fetch(url, {
                method:"POST",
                body:JSON.stringify(message),
                headers:{
                 "Content-Type":"application/json"
                 }
             })
             const data = await request.json();
             setPending(null);
             if(request.ok){
                 setError(draft => {
                     draft.success = data.success;
                     draft.error = null;
                 })
             }
             else{
                 setError(draft => {
                     draft.error = data;
                     draft.success = null;
                 })
             }
        }
        catch{
            setError(draft => {
                draft.success = null;
                draft.error = {global:"Problem with the request"};
            })
            setPending(null);
        }
        
    }

    const handleInput = e => {
        updateMessage(draft => {
            if(e.target.name == "message")draft.message = e.target.value;
            else draft.email = e.target.value;
        
        })
    }

    return {message, error , pending, handleInput, handleSubmit} 
}