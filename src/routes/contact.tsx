import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, MessageCircle, Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/page-hero";
import { services, site } from "@/lib/site-data";
import { sendEnquiry } from "@/lib/send-enquiry";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Squad International | Book a Discovery Call" },
      {
        name: "description",
        content:
          "Talk to Squad International about dedicated offshore teams. Book a 30-minute discovery call, message us on WhatsApp, or send an enquiry.",
      },
      { property: "og:title", content: "Contact Squad International" },
      {
        property: "og:description",
        content: "Book a discovery call or start a WhatsApp conversation with our team.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const values = new FormData(form);
    const read = (field: string) => String(values.get(field) ?? "");

    setSubmitting(true);
    try {
      const result = await sendEnquiry({
        data: {
          name: read("name"),
          company: read("company"),
          email: read("email"),
          phone: read("phone"),
          service: read("service"),
          message: read("message"),
          company_website: read("company_website"),
        },
      });

      if (result.ok) {
        form.reset();
        toast.success("Enquiry received", {
          description: "We'll reply within one working day. For anything urgent, use WhatsApp.",
        });
      } else {
        toast.error("Enquiry not sent", { description: result.message });
      }
    } catch (error) {
      console.error(error);
      toast.error("Enquiry not sent", {
        description: `Please email ${site.email} or message us on WhatsApp and we'll pick it up.`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's scope the team you need"
        description="A 30-minute call is usually enough to size the roles, coverage and cost. Prefer messaging? WhatsApp gets the fastest reply."
      >
        <BookingDialog>
            <Button variant="marigold" size="lg">
              <CalendarDays /> Book a Meeting
            </Button>
          </BookingDialog>
        <Button variant="outlineDark" size="lg" asChild>
          <a href={site.whatsapp} target="_blank" rel="noreferrer">
            <MessageCircle /> Chat With Us
          </a>
        </Button>
      </PageHero>

      <section className="container-page grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] md:py-24">
        <form onSubmit={onSubmit} className="rounded-lg border border-border bg-card p-8">
          <h2 className="text-2xl text-charcoal">Send an enquiry</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tell us roughly what you need covered and we'll come back with a proposed team shape.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" name="name" required placeholder="Jane Doe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" required placeholder="Acme Ltd" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Work email</Label>
              <Input id="email" name="email" type="email" required placeholder="jane@acme.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone / WhatsApp</Label>
              <Input id="phone" name="phone" placeholder="+1 555 000 0000" />
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="service">Service of interest</Label>
              <select
                id="service"
                name="service"
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                defaultValue={services[0]?.title}
              >
                {services.map((s) => (
                  <option key={s.slug}>{s.title}</option>
                ))}
                <option>Not sure yet</option>
              </select>
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="message">What do you need covered?</Label>
              <Textarea
                id="message"
                name="message"
                required
                minLength={10}
                rows={5}
                placeholder="Volumes, hours of coverage, tools you use, timelines…"
              />
            </div>
          </div>

          {/* Honeypot: hidden from people, irresistible to bots. */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company_website">Company website</label>
            <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
          </div>

          <Button type="submit" variant="marigold" size="lg" className="mt-8" disabled={submitting}>
            {submitting ? "Sending…" : "Send enquiry"}
          </Button>
        </form>

        <aside className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-8">
            <h2 className="text-xl text-charcoal">Direct contact</h2>
            <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-marigold" />
                <a href={`mailto:${site.email}`} className="hover:text-marigold">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-marigold" />
                <a href={site.phoneHref} className="hover:text-marigold">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-marigold" />{" "}
                {site.addressLines.join(" ")}
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-marigold" />
                Replies within one working day; WhatsApp usually within the hour.
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-marigold/40 bg-accent/40 p-8">
            <h2 className="text-xl text-charcoal">What happens on the call</h2>
            <ol className="mt-5 space-y-3 text-sm text-charcoal">
              <li>1. We map the work, volumes and tools involved.</li>
              <li>2. We propose a team shape, coverage model and indicative cost.</li>
              <li>3. If it fits, we agree SLAs and a start date.</li>
            </ol>
            <BookingDialog>
            <Button variant="charcoal" className="mt-6 w-full" size="lg">
              <CalendarDays /> Book a Meeting
            </Button>
          </BookingDialog>
          </div>
        </aside>
      </section>
    </>
  );
}
