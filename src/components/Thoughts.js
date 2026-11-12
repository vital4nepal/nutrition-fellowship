import React, { useState } from 'react';
import { email, emailHref } from '../data/site';
import { Section, SectionTitle, textLink } from './ui';

const fields = [
  { name: 'name', label: 'Full Name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email Address', type: 'email', autoComplete: 'email' },
  { name: 'message', label: 'Your Thoughts', type: 'textarea' },
];

const inputClass =
  'w-full appearance-none rounded-none border border-line-strong bg-surface px-3 text-body focus:border-green';

function Field({ name, label, type, autoComplete }) {
  const id = `thoughts-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-ui font-semibold text-ink">
        {label} <span className="font-normal text-muted">(required)</span>
      </label>
      {type === 'textarea' ? (
        <textarea id={id} name={name} required className={`${inputClass} min-h-[160px] resize-y py-3`} />
      ) : (
        <input id={id} name={name} type={type} autoComplete={autoComplete} required className={`${inputClass} h-12`} />
      )}
    </div>
  );
}

const messages = {
  sending: 'Sending your message...',
  sent: 'Thank you! Message sent successfully!',
  error: (
    <>
      Could not send your message. Please email us at{' '}
      <a href={emailHref} className={`underline ${textLink}`}>{email}</a>.
    </>
  ),
};

function Thoughts() {
  const [status, setStatus] = useState('idle');

  const onSubmit = async (event) => {
    event.preventDefault();
    // The button stays focusable while sending (aria-disabled), so this guard blocks a second submit.
    if (status === 'sending') return;
    const form = event.target;
    const formData = new FormData(form);
    formData.append("access_key", "6649cfe5-e72b-4818-aa36-de58ef34225d");

    setStatus('sending');
    // AbortSignal.timeout is missing in Safari 15, which the browserslist still targets.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
        signal: controller.signal,
      });
      const result = res.ok ? await res.json() : null;
      if (!result?.success) throw new Error('web3forms rejected the message');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    } finally {
      clearTimeout(timer);
    }
  };

  return (
    <Section name="thoughts" id="thoughts" className="grid gap-8 lg:grid-cols-12">
      <div className="lg:sticky lg:top-[calc(var(--nf-header-h)+32px)] lg:col-span-5 lg:self-start">
        <SectionTitle>Place Your Thoughts</SectionTitle>
        <p className="mt-3 text-body text-muted">We would love to hear feedback and questions from you.</p>
      </div>
      <form
        onSubmit={onSubmit}
        onInput={() => status !== 'sending' && setStatus('idle')}
        className="flex flex-col gap-5 md:max-w-form lg:col-span-6 lg:col-start-7 lg:max-w-none"
      >
        {fields.map((field) => (
          <Field key={field.name} {...field} />
        ))}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
          <button
            type="submit"
            aria-disabled={status === 'sending'}
            className="h-12 bg-green px-6 font-semibold text-paper transition-colors hover:bg-deep aria-disabled:opacity-60"
          >
            Submit
          </button>
          <p role="status" className={status === 'error' ? 'text-ink' : 'text-green'}>
            {messages[status]}
          </p>
        </div>
      </form>
    </Section>
  );
}

export default Thoughts;
