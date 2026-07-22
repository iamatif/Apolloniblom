'use client';
import ButtonArrow from '@/_components/SVGs/ButtonArrow';
import LightCircle from '@/_components/SVGs/LightCircle';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import * as Yup from 'yup';

export default function LeadForm({ PropertyID }: { PropertyID: number }) {
    const t = useTranslations();
    const locale = useLocale();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required(t("validation.firstName.required"))
            .matches(/^[A-Za-z\u0600-\u06FF\s]*$/, t("validation.firstName.invalid"))
            .min(3, t("validation.firstName.min")),
        lastName: Yup.string()
            .required(t("validation.lastName.required"))
            .matches(/^[A-Za-z\u0600-\u06FF\s]*$/, t("validation.lastName.invalid"))
            .min(3, t("validation.lastName.min")),
        email: Yup.string()
            .email(t("validation.email.invalid"))
            .required(t("validation.email.required")),
        mobile: Yup.string()
            .required(t("validation.mobile.required"))
            .test("is-valid-phone", t("validation.mobile.invalid"), (value) =>
                isValidPhoneNumber(value || "")
            ),
        message:Yup.string().required(t("validation.message.required"))
    });

    const initialValues: {
        firstName: string;
        lastName: string;
        email: string;
        mobile: string;
        message: string;
    } = {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        message: "",
    };

    const handleSubmit = async (values: typeof initialValues) => {
        setIsLoading(true);

        try {
            const res = await fetch(`https://apolloniblom.awareness-profiling.com/api/forms/lead`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name: values.firstName,
                    last_name: values.lastName,
                    email: values.email,
                    phone: values.mobile,
                    message: values.message,
                    property_id: PropertyID,
                }),
            });

            const responseJson = await res.json();

            if (res.ok) {
                setIsSubmitted(true);
            } else {
                console.error("Backend error:", responseJson);
            }
        } catch (error) {
            console.error("Submission error:", error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="">
            {!isSubmitted ? (
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={true}
                    validateOnBlur={true}
                >
                    {({ setFieldValue, values, errors, touched }) => (
                        <Form className="flex flex-col md:gap-4 gap-3  text-primary ">
                            <div className="flex md:gap-5 gap-3 ">
                                <div className="w-1/2">
                                    <div className={` w-full space-y-2.5
                                        `}>
                                        <label htmlFor="firstName" className="text-white text-sm">{t("form.first_name")}</label>
                                        <Field
                                            name="firstName"
                                            className={`input error ${errors.firstName && touched.firstName
                                                ? "border-red-500"
                                                : "border-white"
                                                }  bg-white px-5 py-4 w-full text-sm outline-none placeholder:text-Gray60 text-Gray60 rounded-md placeholder:opacity-70 `}
                                        />
                                    </div>

                                    <ErrorMessage
                                        name="firstName"
                                        component="p"
                                        className="text-red-900 text-xs pt-1.5"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <div className={` w-full space-y-2.5
                                        `}>
                                        <label htmlFor="lastName" className="text-white text-sm">{t("form.last_name")}</label>
                                        <Field
                                            name="lastName"
                                            className={`input error ${errors.lastName && touched.lastName
                                                ? "border-red-500"
                                                : "border-white"
                                                }  bg-white px-5 py-4 w-full text-sm outline-none placeholder:text-Gray60 text-Gray60 rounded-md placeholder:opacity-70 `}
                                        />
                                    </div>

                                    <ErrorMessage
                                        name="lastName"
                                        component="p"
                                        className="text-red-900 text-xs pt-1.5"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className={` w-full space-y-2.5
                                        `}>
                                    <label htmlFor="email" className="text-white text-sm">{t("form.email_Add")}</label>

                                    <Field
                                        name="email"
                                        type="email"
                                        className={`input error ${errors.email && touched.email
                                            ? "border-red-500"
                                            : "border-white"
                                            }  bg-white px-5 py-4 w-full text-sm outline-none placeholder:text-Gray60 text-Gray60 rounded-md placeholder:opacity-70 `}
                                    />
                                </div>

                                <ErrorMessage
                                    name="email"
                                    component="p"
                                    className="text-red-900 text-xs pt-1.5" />
                            </div>
                            <div>
                                <div className={` w-full space-y-2.5
                                        `}>
                                    <label htmlFor="mobile" className="text-white text-sm">{t("form.phone_number")}</label>

                                    <PhoneInput
                                        value={values.mobile}
                                        onChange={(value) => setFieldValue("mobile", value)}
                                        international
                                        defaultCountry="EG"
                                        locales={locale}
                                        className={`input error ${errors.mobile && touched.mobile
                                            ? "border-red-500"
                                            : "border-white"
                                            }  bg-white px-5 py-4 w-full text-sm outline-none placeholder:text-Gray60 text-Gray60 rounded-md placeholder:opacity-70 `}

                                    />

                                </div>

                                <ErrorMessage
                                    name="mobile"
                                    component="p"
                                    className="text-red-900 text-xs pt-1.5"
                                />
                            </div>

                            <div>
                                <div className={` w-full space-y-2.5
                                        `}>
                                    <label htmlFor="mobile" className="text-white text-sm"> {t("form.message")} </label>

                                    <Field
                                        as="textarea"
                                        name="message"
                                        rows={4} // 👈 number of visible rows
                                        className={`input error ${errors.message && touched.message
                                            ? "border-red-500"
                                            : "border-white"
                                            }  bg-white px-5 py-4 w-full text-sm outline-none placeholder:text-Gray60 text-Gray60 rounded-md placeholder:opacity-70 `} />

                                </div>

                                <ErrorMessage
                                    name="message"
                                    component="p"
                                    className="text-red-900 text-xs pt-1.5" />
                            </div>
                            <button
                                type="submit"
                                className={`flex relative bg-Gold text-white hover:text-gOLD hover:bg-white transition-all duration-500 overflow-hidden gap-3 w-full justify-center text-base font-medium rounded-full py-3 ${isLoading ? " pointer-events-none opacity-40" : ""}`}
                            >

                                <span className='w-[52px] h-[52px] absolute start-0 rounded-full overflow-hidden'>
                                    <LightCircle />
                                </span>
                                <span className='w-6 h-6'>
                                    <ButtonArrow />
                                </span>
                                {t("buttons.request")}
                            </button>
                        </Form>
                    )}
                </Formik>
            ) : (
                <div className=" h-[400px] text-center content-center">
                    <h3 className={` text-white text-3xl my-5`}>{t("thanks.lead.title")}</h3>
                    <p className={` text-white text-xl`}>
                        {t("thanks.lead.subtitle")}                    </p>
                </div>
            )}
        </div>
    );
}
