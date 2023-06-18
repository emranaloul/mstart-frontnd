export const validateEmail = (email : string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email address');
    }
  }
export  const validateMobileNumber = (number : string) => {
    const mobileRegex = /^07[7-9]\d{7}$/;
    if (!mobileRegex.test(number)) {
      throw new Error('Invalid mobile number');
    }
  }