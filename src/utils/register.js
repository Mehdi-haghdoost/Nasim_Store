import * as Yup from "yup";

const registerSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "نام حداقل باید 3 کاراکتر داشته باشد")
        .max(12, "نام حداکثر باید 12 کاراکتر داشته باشد")
        .required('ورودی مورد نیاز است'),
    email: Yup.string()
        .required('لطفا ایمیل خود را وارد نمایید')
        .matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g, 'لطفا ایمیل معتبر وارد نمایید')
        .min(10, 'ایمیل حداقل باید 10 کاراکتر داشه باشد')
        .max(30, 'ایمیل حداکثر باید 30 کاراکتر داشته باشد'),
    password: Yup.string()
        .required('لطفا رمز عبور خود را وارد کنید')
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g, 'رمز عبور معتبر وارد نمایید')
});

export default registerSchema;