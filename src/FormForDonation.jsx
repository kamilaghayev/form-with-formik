import { Formik, Form, Field, ErrorMessage, useField } from "formik"
import * as Yup from "yup"
import ErrMessage from "./ErrMessage"


const initialVal = {
    name: '',
    email: '',
    amount: 0,
    currency: '', 
    text: '',
    terms: false
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

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props)
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <Field 
                {...props}
                {...field}
            />
            {meta.touched && meta.error ? <ErrMessage error={meta.error}/> : null}
        </>
    )
}
const FormForDonation = () => {
    return (
        <Formik
            initialValues={initialVal}
            validationSchema={userSchema}
            onSubmit={(values) =>console.log(JSON.stringify(values))}
        >
            {(onSubmitting) => (
                <Form className="form">
                    <MyTextInput 
                        label="Your name" 
                        id="name" 
                        type="name" 
                        name="name"
                    />
                    <MyTextInput 
                        label="Your email"
                        id="email" 
                        type="email" 
                        name="email"
                    />
                    <MyTextInput
                        label="Amount"
                        id="field" 
                        type="number" 
                        name="amount"
                    />
                    <label htmlFor="currency">Currency</label>
                    <Field
                        id="currency"
                        name="currency"
                        as="select">
                            <option value="">Select currency</option>
                            <option value="USD">USD</option>
                            <option value="UAH">UAH</option>
                            <option value="RUB">RUB</option>
                    </Field>
                    <ErrorMessage className="error" name="currency" component="div"/>
                    <label htmlFor="text">Your message</label>
                    <Field 
                        id="text"
                        name="text"
                        as="textarea"
                    />
                    <ErrorMessage className="error" name="text" component="div"/>
                    <label className="checkbox">
                        <Field 
                            name="terms" 
                            type="checkbox"
                        />
                            Agree to terms and conditions
                    </label>
                    <ErrorMessage className="error" name="terms" component="div"/>
                    <button type="submit">Submitting</button>
                </Form>
            )}
        </Formik>
    )
}

export default FormForDonation