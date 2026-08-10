import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Send } from 'lucide-react';
import { contactSchema, type ContactInput } from '../../utils/validators';
import { submitContact } from '../../services/mailService';
import { TextInput, TextArea } from '../../components/ui/FormField';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../contexts/ToastContext';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    const result = await submitContact(data);
    if (result.delivered) {
      showToast("Message sent — we'll get back to you soon.", 'success');
    } else {
      showToast('Message saved locally (mail delivery not configured in this environment).', 'info');
    }
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        <h3 className="text-xl font-semibold text-[var(--text-h)]">Message sent</h3>
        <p className="max-w-sm text-sm text-[var(--text)]">We typically respond within a couple of days.</p>
        <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput label="Full name" htmlFor="fullName" required placeholder="Your name" error={errors.fullName?.message} {...register('fullName')} />
        <TextInput label="Email" htmlFor="email" type="email" required placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput label="Phone (optional)" htmlFor="phone" placeholder="98765 43210" error={errors.phone?.message} {...register('phone')} />
        <TextInput label="Mandal name (optional)" htmlFor="mandalName" placeholder="Shree Ganesh Mitra Mandal" error={errors.mandalName?.message} {...register('mandalName')} />
      </div>
      <TextArea label="Message" htmlFor="message" required placeholder="Tell us how we can help" error={errors.message?.message} {...register('message')} />
      <Button type="submit" isLoading={isSubmitting} size="lg">
        <Send className="h-4 w-4" /> Send message
      </Button>
    </form>
  );
}
