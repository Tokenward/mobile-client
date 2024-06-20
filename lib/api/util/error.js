export class AppError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

export function throwError(message, code) {
    throw new AppError(message, code);
}

export function handleAsyncError(error, fallback) {
    console.error(error);
    if (fallback) {
        fallback();
    }
}

export function handleError(error, message) {
    console.error(error);
    Alert.alert('Error', message || error.message);
}

export function handleFirebaseError(error) {
    console.error(error);
    if (error.code) {
        switch (error.code) {
            case 'auth/email-already-in-use':
                return 'Email already in use';
            case 'auth/invalid-email':
                return 'Invalid email address';
            case 'auth/weak-password':
                return 'Password is too weak';
            case 'auth/user-not-found':
                return 'User not found';
            case 'auth/wrong-password':
                return 'Incorrect password';
            case 'auth/too-many-requests':
                return 'Too many requests. Please try again later.';
            case 'auth/network-request-failed':
                return 'Network error. Please check your connection.';
            case 'auth/requires-recent-login':
                return 'Please log in again and retry this action.';
            case 'auth/operation-not-allowed':
                return 'This operation is not allowed. Please contact support.';
            case 'auth/user-disabled':
                return 'This user account has been disabled.';
            default:
                return error.message;
        }
    } else {
        return 'An unknown error occurred';
    }
}