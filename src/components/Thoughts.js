import React, { useState } from 'react';
import Swal from 'sweetalert2';
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
      <label htmlFor={id} className="mb-2 block text-[0.9375rem] font-semibold text-ink">
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

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    formData.append("access_key", "6649cfe5-e72b-4818-aa36-de58ef34225d");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    setSending(true);
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
        Swal.fire({
          title: "Thank you!",
          text: "Message sent successfully!",
          icon: "success",
        });
        form.reset();
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <Section name="thoughts" id="thoughts" className="grid gap-8 py-12 lg:grid-cols-12 lg:py-16">
      <div className="lg:col-span-5">
        <SectionTitle>Place Your Thoughts</SectionTitle>
        <p className="mt-3 text-body text-muted">We would love to hear feedback and questions from you.</p>
      </div>
      <form onSubmit={onSubmit} className="flex max-w-form flex-col gap-5 lg:col-span-6 lg:col-start-7">
        {fields.map((field) => (
          <Field key={field.name} {...field} />
        ))}
        <button
          type="submit"
          disabled={sending}
          className="h-12 bg-green px-6 font-semibold text-paper transition-colors hover:bg-deep disabled:opacity-60 lg:self-start"
        >
          Submit
        </button>
      </form>
    </Section>
  );
}

export default Thoughts;
