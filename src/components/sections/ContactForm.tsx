"use client";

import { useId, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import {
  emptyEnquiry,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryValues,
} from "@/lib/enquiry";
import {
  BRIEF_ACCEPT,
  budgetBands,
  MAX_BRIEF_BYTES,
  projectTypes,
  timelines,
} from "@/content/contact";
import { contact } from "@/content/site";
import { Button } from "@/components/primitives/Button";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string; showEmailFallback: boolean };

/**
 * Project enquiry form.
 *
 * States: idle → submitting → success | error. The success state is only ever
 * reached on a 200 from the API, which itself only returns 200 once the
 * enquiry has actually been delivered. Nothing here pretends.
 *
 * Validation runs on blur once a field has been touched, then on every change
 * for fields already showing an error, so the form corrects itself as you fix
 * it, without shouting at you while you type the first character.
 */
export function ContactForm() {
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof EnquiryValues, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  const setField = (field: keyof EnquiryValues, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);

    // Re-validate live only for a field that is already flagged.
    if (errors[field]) {
      const nextErrors = validateEnquiry(next);
      setErrors((current) => ({ ...current, [field]: nextErrors[field] }));
    }
  };

  const onBlur = (field: keyof EnquiryValues) => {
    setTouched((current) => ({ ...current, [field]: true }));
    const nextErrors = validateEnquiry(values);
    setErrors((current) => ({ ...current, [field]: nextErrors[field] }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);
    setTouched(
      Object.fromEntries(
        Object.keys(values).map((key) => [key, true]),
      ) as Record<keyof EnquiryValues, boolean>,
    );

    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first problem so keyboard and screen-reader users
      // are not left hunting for it.
      const firstField = Object.keys(nextErrors)[0];
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstField}"]`)
        ?.focus();
      return;
    }

    setStatus({ kind: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string; errors?: EnquiryErrors; reason?: string }
        | null;

      if (response.ok && payload?.ok) {
        setStatus({ kind: "success" });
        setValues(emptyEnquiry);
        setErrors({});
        setTouched({});
        return;
      }

      if (payload?.errors) setErrors(payload.errors);

      setStatus({
        kind: "error",
        message:
          payload?.message ??
          "We couldn't send that just now. Please try again in a moment.",
        showEmailFallback: payload?.reason !== "validation",
      });
    } catch {
      setStatus({
        kind: "error",
        message:
          "We couldn't reach our server. Check your connection and try again, or email us directly.",
        showEmailFallback: true,
      });
    } finally {
      statusRef.current?.focus();
    }
  };

  /**
   * Reads the chosen file into the enquiry as base64.
   *
   * Held in state rather than uploaded on selection: there is nowhere to
   * upload it to, so it travels with the submission or not at all. Oversized
   * files are still stored so validation can explain the ceiling rather than
   * the field silently doing nothing.
   */
  const setBrief = (file: File | null) => {
    if (!file) {
      setValues((current) => ({ ...current, brief: null }));
      setErrors((current) => ({ ...current, brief: undefined }));
      return;
    }

    if (file.size > MAX_BRIEF_BYTES) {
      setValues((current) => ({ ...current, brief: null }));
      setErrors((current) => ({
        ...current,
        brief: `That file is over ${Math.round(MAX_BRIEF_BYTES / (1024 * 1024))}MB. Email it across instead and we will match it to your enquiry.`,
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      // Strip the data: prefix so only the payload travels.
      const data = result.slice(result.indexOf(",") + 1);
      setValues((current) => ({
        ...current,
        brief: { name: file.name, type: file.type, size: file.size, data },
      }));
      setErrors((current) => ({ ...current, brief: undefined }));
    };
    reader.onerror = () =>
      setErrors((current) => ({
        ...current,
        brief: "That file could not be read. Try attaching it again.",
      }));
    reader.readAsDataURL(file);
  };

  if (status.kind === "success") {
    return <SuccessState onReset={() => setStatus({ kind: "idle" })} />;
  }

  const submitting = status.kind === "submitting";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="w-full">
      {/* Live region for submission outcomes. */}
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={cn(status.kind === "error" ? "mb-8 block" : "sr-only")}
      >
        {status.kind === "error" ? (
          <div className="border border-[var(--color-danger)]/40 bg-[var(--color-danger)]/8 p-6">
            <p className="eyebrow text-[var(--color-danger)]">Not sent</p>
            <p className="mt-3 text-body-sm leading-relaxed text-[var(--text-strong)]">
              {status.message}
            </p>
            {status.showEmailFallback ? (
              <p className="mt-4 text-body-sm text-[var(--text-muted)]">
                Email{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="text-[var(--accent)] underline underline-offset-4"
                >
                  {contact.email}
                </a>{" "}
                or call{" "}
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="text-[var(--accent)] underline underline-offset-4"
                >
                  {contact.phone}
                </a>
                .
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <fieldset disabled={submitting} className="contents">
        <FormGroup title="Your Information" />

        <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
          <Field
            id={`${baseId}-fullName`}
            name="fullName"
            label="Full name"
            required
            value={values.fullName}
            error={touched.fullName ? errors.fullName : undefined}
            onChange={setField}
            onBlur={onBlur}
            autoComplete="name"
          />

          <Field
            id={`${baseId}-organization`}
            name="organization"
            label="Organisation"
            value={values.organization}
            error={touched.organization ? errors.organization : undefined}
            onChange={setField}
            onBlur={onBlur}
            autoComplete="organization"
          />

          <Field
            id={`${baseId}-email`}
            name="email"
            label="Email"
            type="email"
            required
            value={values.email}
            error={touched.email ? errors.email : undefined}
            onChange={setField}
            onBlur={onBlur}
            autoComplete="email"
          />

          <Field
            id={`${baseId}-phone`}
            name="phone"
            label="Phone"
            type="tel"
            value={values.phone}
            error={touched.phone ? errors.phone : undefined}
            onChange={setField}
            onBlur={onBlur}
            autoComplete="tel"
          />

          <div className="sm:col-span-2">
            <FormGroup title="Project" />
          </div>

          <SelectField
            id={`${baseId}-projectType`}
            name="projectType"
            label="Project type"
            required
            placeholder="Select the closest match"
            options={projectTypes}
            value={values.projectType}
            error={touched.projectType ? errors.projectType : undefined}
            onChange={setField}
            onBlur={onBlur}
          />

          <SelectField
            id={`${baseId}-timeline`}
            name="timeline"
            label="Desired timeline"
            placeholder="Select a timeline"
            options={timelines}
            value={values.timeline}
            error={touched.timeline ? errors.timeline : undefined}
            onChange={setField}
            onBlur={onBlur}
          />

          <div className="sm:col-span-2">
            <FormGroup title="Tell Us About The Project" />
          </div>

          <div className="sm:col-span-2">
            <TextareaField
              id={`${baseId}-projectDescription`}
              name="projectDescription"
              label="Project description"
              required
              hint="What is the story, who needs to see it, and what should it change?"
              rows={5}
              value={values.projectDescription}
              error={
                touched.projectDescription
                  ? errors.projectDescription
                  : undefined
              }
              onChange={setField}
              onBlur={onBlur}
            />
          </div>

          <SelectField
            id={`${baseId}-budget`}
            name="budget"
            label="Estimated budget"
            placeholder="Select a range"
            options={budgetBands}
            value={values.budget}
            error={touched.budget ? errors.budget : undefined}
            onChange={setField}
            onBlur={onBlur}
          />

          <div className="sm:col-span-2">
            <TextareaField
              id={`${baseId}-message`}
              name="message"
              label="Anything else"
              hint="Optional, context, constraints, links, deadlines."
              rows={4}
              value={values.message}
              error={touched.message ? errors.message : undefined}
              onChange={setField}
              onBlur={onBlur}
            />
          </div>

          <div className="sm:col-span-2">
            <BriefField
              id={`${baseId}-brief`}
              brief={values.brief}
              error={errors.brief}
              onChange={setBrief}
            />
          </div>
        </div>

        {/* Honeypot, visually and programmatically hidden from real users. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${baseId}-website`}>
            Leave this field empty
            <input
              id={`${baseId}-website`}
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={(event) => setField("website", event.target.value)}
            />
          </label>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-[var(--line)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-micro leading-relaxed text-[var(--text-faint)]">
            We read every enquiry ourselves. Fields marked with an asterisk are
            required.
          </p>

          <Button type="submit" size="lg" withArrow={!submitting}>
            {submitting ? "Sending…" : "Submit Project"}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}

/* ---------------------------------------------------------------- fields -- */

const FIELD_CLASS =
  "w-full border-b bg-transparent px-0 py-3 text-body text-[var(--text-strong)] placeholder:text-[var(--text-faint)] transition-colors duration-[var(--dur-fast)] focus:outline-none";

type FieldCommon = {
  id: string;
  name: keyof EnquiryValues;
  label: string;
  required?: boolean;
  hint?: string;
  value: string;
  error?: string;
  onChange: (field: keyof EnquiryValues, value: string) => void;
  onBlur: (field: keyof EnquiryValues) => void;
};

function FieldShell({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="eyebrow-muted flex items-center gap-1.5 text-[var(--text-strong)]/70"
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="text-[var(--accent)]">
            *
          </span>
        ) : null}
      </label>

      {children}

      {error ? (
        <p id={`${id}-error`} className="mt-2 text-micro text-[var(--color-danger)]">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-micro text-[var(--text-faint)]">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function Field({
  type = "text",
  autoComplete,
  ...props
}: FieldCommon & { type?: string; autoComplete?: string }) {
  const { id, name, value, error, onChange, onBlur, label, required, hint } =
    props;

  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      hint={hint}
      error={error}
    >
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        onChange={(event) => onChange(name, event.target.value)}
        onBlur={() => onBlur(name)}
        className={cn(
          FIELD_CLASS,
          "mt-2",
          error
            ? "border-danger focus:border-danger"
            : "border-[var(--line)] focus:border-brass",
        )}
      />
    </FieldShell>
  );
}

function SelectField({
  options,
  placeholder,
  ...props
}: FieldCommon & { options: readonly string[]; placeholder: string }) {
  const { id, name, value, error, onChange, onBlur, label, required, hint } =
    props;

  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      hint={hint}
      error={error}
    >
      <div className="relative mt-2">
        <select
          id={id}
          name={name}
          value={value}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            error ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          onChange={(event) => onChange(name, event.target.value)}
          onBlur={() => onBlur(name)}
          className={cn(
            FIELD_CLASS,
            "cursor-pointer appearance-none pr-8",
            value ? "text-[var(--text-strong)]" : "text-[var(--text-faint)]",
            error
              ? "border-danger focus:border-danger"
              : "border-[var(--line)] focus:border-brass",
          )}
        >
          <option value="" className="bg-charcoal text-[var(--text-faint)]">
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="bg-charcoal text-[var(--text-strong)]">
              {option}
            </option>
          ))}
        </select>

        <svg
          aria-hidden="true"
          viewBox="0 0 12 8"
          className="pointer-events-none absolute top-1/2 right-0 h-2 w-3 -translate-y-1/2 fill-none stroke-brass stroke-[1.5]"
        >
          <path d="M1 1.5 6 6.5l5-5" strokeLinecap="square" />
        </svg>
      </div>
    </FieldShell>
  );
}

function TextareaField({
  rows = 4,
  ...props
}: FieldCommon & { rows?: number }) {
  const { id, name, value, error, onChange, onBlur, label, required, hint } =
    props;

  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      hint={hint}
      error={error}
    >
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        onChange={(event) => onChange(name, event.target.value)}
        onBlur={() => onBlur(name)}
        className={cn(
          FIELD_CLASS,
          "mt-2 resize-y leading-relaxed",
          error
            ? "border-danger focus:border-danger"
            : "border-[var(--line)] focus:border-brass",
        )}
      />
    </FieldShell>
  );
}

/* --------------------------------------------------------------- success -- */

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="border border-brass/40 bg-charcoal p-10 sm:p-14"
    >
      <p className="eyebrow">Received</p>

      <h3 className="font-display mt-6 text-h2 text-paper">
        Thank you, your brief is with us.
      </h3>

      <p className="mt-5 max-w-xl text-body-lg leading-relaxed text-[var(--text-body-color)]">
        We read every enquiry ourselves and will come back to you with a point
        of view on the story, not a generic acknowledgement.
      </p>

      <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button variant="outline" size="md" onClick={onReset}>
          Send another enquiry
        </Button>
        <a
          href={`mailto:${contact.email}`}
          className="text-body-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
        >
          Or reach us at {contact.email}
        </a>
      </div>
    </div>
  );
}


/** Small caps rule that opens each group of fields. */
function FormGroup({ title }: { title: string }) {
  return (
    <p className="eyebrow-muted mt-14 flex items-center gap-3 border-t pt-8 first:mt-0 first:border-t-0 first:pt-0">
      {title}
    </p>
  );
}

/**
 * Brief upload.
 *
 * Deliberately plain: a button, the chosen filename, and a way to remove it.
 * The copy states the ceiling up front, because discovering a size limit
 * after filling in a form is the worst place to discover it.
 */
function BriefField({
  id,
  brief,
  error,
  onChange,
}: {
  id: string;
  brief: EnquiryValues["brief"];
  error?: string;
  onChange: (file: File | null) => void;
}) {
  const limitMb = Math.round(MAX_BRIEF_BYTES / (1024 * 1024));

  return (
    <div>
      <label htmlFor={id} className="eyebrow-muted">
        Upload Brief
      </label>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <input
          id={id}
          name="brief"
          type="file"
          accept={BRIEF_ACCEPT}
          onChange={(event) => onChange(event.target.files?.[0] ?? null)}
          className="block w-full text-body-sm text-[var(--text-muted)] file:mr-4 file:cursor-pointer file:border file:border-[var(--line-strong)] file:bg-transparent file:px-5 file:py-3 file:font-mono file:text-[0.65rem] file:tracking-[0.16em] file:text-[var(--text-strong)] file:uppercase hover:file:bg-[var(--wash)]"
        />
      </div>

      {brief ? (
        <p className="mt-3 text-body-sm text-[var(--text-body-color)]">
          Attached: <span className="text-[var(--text-strong)]">{brief.name}</span>{" "}
          <button
            type="button"
            onClick={() => onChange(null)}
            className="ml-2 underline underline-offset-4 hover:text-[var(--text-strong)]"
          >
            Remove
          </button>
        </p>
      ) : (
        <p className="mt-3 text-micro leading-relaxed text-[var(--text-faint)]">
          Optional. PDF, Word, PowerPoint or text, up to {limitMb}MB. Anything
          larger is better emailed across.
        </p>
      )}

      {error ? (
        <p role="alert" className="mt-3 text-body-sm text-[var(--color-danger)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
