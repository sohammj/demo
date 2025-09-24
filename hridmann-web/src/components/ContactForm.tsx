"use client";

import { useState } from "react";

export default function ContactForm({ label }: { label?: string }) {
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setSuccess(true);
        form.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        action="https://formsubmit.co/sohampandey083@gmail.com"
        method="POST"
        className="row g-3"
      >
        {/* Name */}
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            required
            name="name"
            type="text"
            className="form-control"
            placeholder="Your full name"
          />
        </div>

        {/* Email */}
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            required
            name="email"
            type="email"
            className="form-control"
            placeholder="you@example.com"
          />
        </div>

        {/* Message */}
        <div className="col-12">
          <label className="form-label">Message</label>
          <textarea
            required
            name="message"
            className="form-control"
            rows={5}
            placeholder="How can we help?"
          />
        </div>

        {/* Hidden fields */}
        <input type="hidden" name="_captcha" value="false" />

        {/* Submit */}
        <div className="col-12 d-flex align-items-center gap-3">
          <button className="btn btn-primary" type="submit">
            <i className="bi bi-send me-2" />
            {label || "Send"}
          </button>
          <small className="muted">
            By submitting, you consent to be contacted about your enquiry.
          </small>
        </div>
      </form>

      {success && (
        <div className="alert alert-success mt-3">
          ✅ Thanks for submitting! We’ll get back to you soon.
        </div>
      )}
    </>
  );
}
