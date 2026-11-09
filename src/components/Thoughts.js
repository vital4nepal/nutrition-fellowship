import React, { useState } from 'react';
import { Section, SectionTitle } from './ui';

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
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea id={id} name={name} required className={`${inputClass} min-h-[160px] resize-y py-3`} />
      ) : (
        <input id={id} name={name} type={type} autoComplete={autoComplete} required className={`${inputClass} h-12`} />
      )}
    </div>
  );
}

function Thoughts() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    formData.append("access_key", "6649cfe5-e72b-4818-aa36-de58ef34225d");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    setSending(true);
    setSent(false);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());

      if (res.success) {
        setSent(true);
        form.reset();
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <Section name="thoughts" id="thoughts" className="grid gap-8 lg:grid-cols-12">
      <div className="lg:sticky lg:top-[calc(var(--nf-header-h)+32px)] lg:col-span-5 lg:self-start">
        <SectionTitle>Place Your Thoughts</SectionTitle>
        <p className="mt-3 text-body text-muted">We would love to hear feedback and questions from you.</p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-5 md:max-w-form lg:col-span-6 lg:col-start-7 lg:max-w-none">
        {fields.map((field) => (
          <Field key={field.name} {...field} />
        ))}
        <button
          type="submit"
          disabled={sending}
          className="h-12 bg-green px-6 font-semibold text-paper transition-colors hover:bg-deep disabled:opacity-60 md:self-start"
        >
          Submit
        </button>
        <p role="status" className="text-green">
          {sent && 'Thank you! Message sent successfully!'}
        </p>
      </form>
    </Section>
  );
}

export default Thoughts;
