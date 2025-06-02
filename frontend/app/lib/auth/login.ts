import { signInWithEmailAndPassword, getIdToken  } from "firebase/auth";
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

    const idToken = await getIdToken(user);
    await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
    });

    return user;
}