import * as Yup from "yup";

const emailSchema = Yup.string()
    .email('ایمیل معتبر نیست')
    .required('لطفا ایمیل خود را وارد نمایید')

const phoneSchema = Yup.string()
    .matches(/^9\d{9}$/, 'شماره موبایل معتبر نیست')
    .required("لطفا شماره تلفن خود را وارد نمایید")

const registerSchema = Yup.object().shape({
    phoneOrEmail: Yup.string()
        .test('is-phone-or-email', 'ورودی باید ایمیل یا شماره موبایل باشد', function (value) {
            const { path, createError } = this; return (
                emailSchema.isValidSync(value) ||
                phoneSchema.isValidSync(value) ||
                createError({ path, message: 'ورودی باید ایمیل یا شماره موبایل باشد' })
            );
        })
        .required('ورودی مورد نیاز است'),
    password: Yup.string()
        .min(8, 'پسورد باید حداقل 8 کاراکتر باشد')
        .matches(/[a-z]/, 'پسورد باید حداقل یک حرف کوچک داشته باشد').matches(/[A-Z]/,
            'پسورد باید حداقل یک حرف بزرگ داشته باشد')
        .matches(/[0-9]/, 'پسورد باید حداقل یک عدد داشته باشد')
        .matches(/[@$!%*?&]/, 'پسورد باید حداقل یک کاراکتر خاص داشته باشد')
        .required('پسورد مورد نیاز است'),
});

export default registerSchema;