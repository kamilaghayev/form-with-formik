import { useFormik } from "formik"
import * as Yup from "yup"
import ErrMessage from "./ErrMessage"

const validate = (values) => {
    const errors = {}
    if (!values.name) {
        errors.name = "required"
    } else if (values.name.length < 4) {
        errors.name = "min 4 symbols"
    }

    if (!values.email) {
        errors.email = "required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "wrong email"
    }
    return errors;
}

const userSchema = Yup.object({
    name: Yup.string()
        .min(4, "min 4 symbol")
        .required('required'),
    email: Yup.string()
        .email('wrong email')
        .required('required'),
    amount: Yup.number()
        .min(5, "min 5")
        .required('required'),
    currency: Yup.string().required('select currency'), 
    text: Yup.string()
        .min(10, "min 10 symbol"),
    terms: Yup.boolean()
        .required('accept terms')
        .oneOf([true], 'accepting terms')
})
const Form = () => {
    
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            amount: 0,
            currency: '', 
            text: '',
            terms: false
        },
        validationSchema: userSchema,
        onSubmit: values => console.log(JSON.stringify(values, null, 2))
    })
    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <h2>Send a donation</h2>
            <label htmlFor="name">Your name</label>
            {formik.errors.name && formik.touched.name ? <ErrMessage error={formik.errors.name}/>: null}
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            <label htmlFor="email">Your email</label>
            {formik.errors.email && formik.touched.email ? <ErrMessage error={formik.errors.email}/>: null}
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            <label htmlFor="amount">Amount</label>
            {formik.errors.amount && formik.touched.amount ? <ErrMessage error={formik.errors.amount}/>: null}
                <input
                    id="amount"
                    name="amount"
                    type="number"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            <label htmlFor="currency">Currency</label>
            {formik.values.currency && formik.touched.currency ? <ErrMessage error={formik.errors.currency}/> : null}
                <select
                    id="currency"
                    name="currency"
                    value={formik.values.currency}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}>
                        <option value="">Select currency</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </select>
            <label htmlFor="text">Your message</label>
            {formik.values.text && formik.touched.text ? <ErrMessage error={formik.errors.text}/> : null}
                <textarea 
                    id="text"
                    name="text"
                    value={formik.values.text}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            <label className="checkbox">
            {formik.values.terms && formik.touched.terms ? <ErrMessage error={formik.errors.terms}/> : null}
                <input 
                    name="terms" 
                    type="checkbox"
                    value={formik.values.terms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                Agree to terms and conditions
            </label>
            <button type="submit">Submitting</button>
        </form>
    )
}

export default Form