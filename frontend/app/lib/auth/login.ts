import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";

export async function login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await user.reload();

    if (!user.emailVerified) {
        const error = new Error as any;
        error.code = "auth/email-not-verified";
        throw error;
    }

    return user;
}