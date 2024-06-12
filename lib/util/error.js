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
        default:
          return error.message;
      }
    } else {
      return 'An unknown error occurred';
    }
  }