import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
    phoneOrEmail: Yup.string()
        .required('لطفا شماره تلفن یا ایمیل خود را وارد کنید')
       .test('is-valid', 'ایمیل یا شماره موبایل صحیح نیست',function(value) {
        const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;
        return emailRegex.test(value) || phoneRegex.test(value);
       }),
        
    password: Yup.string()
        .required('لطفا رمز عبور خود را وارد کنید')
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g,'رمز عبور معتبر وارد نمایید')
})

export default loginSchema;