import styles from "@/styles/Contact.module.css"
import {Input} from "./contact"
import {useForm} from "../hooks/useForm";
import Head from "next/head";
import {Norobots} from "@/components/Robots"
const Report = () => {
    const {message, error, pending, handleInput,
        handleSubmit} = useForm({email:"", message:""}, "/api/report/");
    return (
    <>
    <Head>
        <title>Report an error</title>
    </Head>
    <Norobots />
    <div className={styles.content}>
        <form onSubmit={handleSubmit} className={`${styles.form} ${styles.form_error}`}>
            <h2 className={"white center dosis nomar " + styles.error_bg}>Report an issue</h2>
            <Input name={"email"}  >
                <input className={error?.error?.email && styles.error} value={message.email} name={"email"} onChange={handleInput}
                placeholder={"your email"} type={"email"} />
                {error?.error?.email && 
                <p className={styles.error}>{error?.error?.email.map(err => {
                    return <span>{err}</span>
                })}
                </p>}
            </Input>
            
            <Input name={"error"}>
                <textarea className={error?.error?.message && styles.error} value={message.message} name={"message"} 
                onChange={handleInput}
                placeholder={"the error"} rows={5} />
                {error?.error?.message && 
                <p className={styles.error}>{error?.error?.message.map(err => {
                    return <span>{err}</span>
                })}
                </p>}
            </Input>
                {error.success &&
            <p className={styles.success}>
                {error.success}
            </p>}
            {error.error?.global && <p style={{marginLeft:"10px"}} className={styles.error}>
                {error.error.global}
            </p>}
            <div className={styles.field}>
            <button disabled={pending} className={`${styles.sendButton} ${styles.sendErrorButton} dosis ` + (pending && styles.isLoading)} type="submit">
                {pending ? 
                (
                <svg class="spinner" viewBox="0 0 50 50">
                    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5">

                    </circle>
                </svg>
                ) : "Send"}
                </button>
            </div>
        </form>
    </div>
    </>
);
}
 
export default Report;