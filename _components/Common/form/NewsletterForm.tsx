'use client'
import { useLocale } from 'next-intl';
import React, { useState, FormEvent } from 'react';

export default function NewsLetterForm() {
    const locale = useLocale();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // const response = await fetch('/api/newsletter', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ email }),
            // });

            // const result = await response.json();

            // if (response.ok && result.success) {
            //     setSubmitStatus({
            //         success: true,
            //         message:
            //             locale === 'es'
            //                 ? '¡Suscripción exitosa!'
            //                 : locale === 'ar'
            //                 ? 'تم الاشتراك بنجاح!'
            //                 : 'Successfully subscribed!',
            //     });
            //     setEmail('');
            // } else {
            //     setSubmitStatus({
            //         success: false,
            //         message:
            //             result.message ||
            //             (locale === 'ar'
            //                 ? 'البريد الإلكتروني موجود بالفعل'
            //                 : 'Email already exists'),
            //     });
            // }
        } catch (error) {
            console.error('Newsletter submission error:', error);
            setSubmitStatus({
                success: false,
                message:
                    locale === 'ar'
                        ? 'حدث خطأ في الاتصال'
                        : 'Connection error',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            {submitStatus && submitStatus.success ? (
                <p className="text-gold-10 md:text-2xl text-lg">{submitStatus.message}</p>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="relative flex items-center justify-between gap-2 border border-Gray20 bg-white rounded-full py-1 ps-5 pe-1.5 w-full"
                >
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your Email Address"
                        className="w-[calc(100%-120px)] text-base text-black7 placeholder:text-black7 focus:outline-none bg-transparent"
                        required
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="text-Gray10 bg-Gray90 w-fit text-center hover:bg-white hover:text-black text-sm font-semibold px-4 py-[11px] rounded-full transition-all duration-500 disabled:opacity-70"
                    >
                        {isSubmitting
                            ? locale === 'ar'
                                ? 'جارٍ الإرسال...'
                                : 'Submitting...'
                            : locale === 'ar'
                                ? 'ارسال'
                                : 'Submit'}
                    </button>
                </form>
            )}
            {submitStatus && !submitStatus.success && (
                <p className="text-red-700 text-sm ms-1 mt-1">{submitStatus.message}</p>
            )}
        </div>
    );
}
