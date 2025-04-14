'use client';

import { useState } from 'react';
import './contactSection.css';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function ContactSection() {
    const [hasWebsite, setHasWebsite] = useState(false);
    const [wantsToBook, setWantsToBook] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement & {
            name: { value: string };
            email: { value: string };
            website?: { value: string };
            message: { value: string };
            phone?: { value: string };
        };

        const formData = {
            name: form.name.value,
            email: form.email?.value || '',
            website: form.website?.value || '',
            message: form.message.value,
            phone: form.phone?.value || '',
            selectedDate: selectedDate?.toISOString() || '',
        };

        const webhookUrl = 'https://hook.us2.make.com/2hb9avxpgako5jrp2dl5j468f65yp2h3';

        try {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // ✅ show thank you message
            setSubmitted(true);
        } catch (error) {
            console.error('Submission error:', error);
        }
    };

    return (
        <section className="contact-section">
            <div className="contact-beam" />

            <div className="contact-content">
                {submitted ? (
                    <div className="confirmation-message">
                        <h3>✅ Thank you!</h3>
                        <p>Your message was received. We'll be in touch soon.</p>
                    </div>
                ) : (
                    <>
                        <h2>Let&apos;s connect to bring a new light to your site?</h2>

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <label>
                                Name (required)
                                <input type="text" name="name" required />
                            </label>

                            <label>
                                Email (required)
                                <input type="email" name="email" required />
                            </label>

                            <div className="question-group">
                                <p className="question">Do you have an existing website?</p>
                                <div className="toggle-buttons">
                                    <button
                                        type="button"
                                        className={hasWebsite ? 'active' : ''}
                                        onClick={() => setHasWebsite(true)}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        type="button"
                                        className={!hasWebsite ? 'active' : ''}
                                        onClick={() => setHasWebsite(false)}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>

                            {hasWebsite && (
                                <label>
                                    Website URL
                                    <input type="url" name="website" placeholder="https://yourwebsite.com" />
                                </label>
                            )}

                            <div className="question-group">
                                <p className="question">Would you like to book a call?</p>
                                <div className="toggle-buttons">
                                    <button
                                        type="button"
                                        className={wantsToBook ? 'active' : ''}
                                        onClick={() => setWantsToBook(true)}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        type="button"
                                        className={!wantsToBook ? 'active' : ''}
                                        onClick={() => setWantsToBook(false)}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>

                            {wantsToBook && (
                                <>
                                    <label>
                                        Select a date and time
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={(date: Date | null) => setSelectedDate(date)}
                                            showTimeSelect
                                            timeIntervals={30}
                                            minDate={new Date()}
                                            maxDate={new Date(new Date().setDate(new Date().getDate() + 10))}
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            className="datepicker"
                                            placeholderText="Choose a date and time"
                                        />
                                    </label>

                                    <label>
                                        Phone Number (optional)
                                        <input type="tel" name="phone" placeholder="(123) 456-7890" />
                                    </label>
                                </>
                            )}

                            <label>
                                Message
                                <textarea name="message" rows={5} placeholder="Tell us about your project..." />
                            </label>

                            <button type="submit">Submit</button>
                        </form>

                        
                        <div className="gator-image">
                            <Image src="/gatorImg.png" alt="Cartoon gator" width={700} height={700} />
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
