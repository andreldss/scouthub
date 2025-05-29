import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";

export async function login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return user;
}