"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { faqs } from "@/data/faq";

/**
 * FAQ section — premium accordion with accessible markup.
 *
 * - One item open at a time (single-expand)
 * - CSS height transition via max-height trick (no layout jump)
 * - aria-expanded / aria-controls / id on every item
 * - Keyboard: Tab, Enter, Space all work naturally (button element)
 * - Placed between Services and Contact in page.tsx
 */
export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative py-section bg-gradient-to-b from-surface via-[hsl(225,16%,6.5%)] to-surface"
      aria-labelledby="faq-heading"
    >
      <Container>
        <RevealOnScroll>
          <SectionHeader
            eyebrow="05 / FAQ"
            title="Common Questions"
            description="Answers to the questions I hear most often before a project starts."
          />
        </RevealOnScroll>

        {/* Accordion */}
        <RevealOnScroll delay={100}>
          <div
            className="mt-12 lg:mt-16 mx-auto max-w-3xl"
            role="list"
          >
            {faqs.map((item, index) => {
              const isOpen = openId === item.id;
              const panelId = `${item.id}-panel`;

              return (
                <RevealOnScroll key={item.id} delay={index * 40}>
                  <div
                    role="listitem"
                    className={cn(
                      "border-b border-border transition-colors duration-200",
                      index === 0 && "border-t"
                    )}
                  >
                    {/* Question button */}
                    <button
                      id={item.id}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(item.id)}
                      className={cn(
                        "group w-full flex items-center justify-between gap-6 py-5 text-left",
                        "text-body-lg font-medium transition-colors duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm",
                        isOpen ? "text-accent" : "text-foreground hover:text-accent"
                      )}
                    >
                      <span>{item.question}</span>

                      {/* Icon */}
                      <span
                        className={cn(
                          "shrink-0 flex items-center justify-center h-6 w-6 rounded-full border transition-all duration-300",
                          isOpen
                            ? "border-accent bg-accent/10 text-accent rotate-0"
                            : "border-border-strong bg-surface-elevated text-muted group-hover:border-accent/50 group-hover:text-accent"
                        )}
                        aria-hidden="true"
                      >
                        {isOpen ? <Minus size={12} strokeWidth={2.5} /> : <Plus size={12} strokeWidth={2.5} />}
                      </span>
                    </button>

                    {/* Answer panel — CSS max-height transition, no layout jump */}
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={item.id}
                      className={cn(
                        "overflow-hidden transition-all duration-300 ease-out",
                        isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <p className="pb-6 pr-12 text-body text-muted leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* Subtle CTA — positioned after FAQ, before Contact section */}
        <RevealOnScroll delay={200}>
          <div className="mt-14 lg:mt-16 mx-auto max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-border">
            <div>
              <p className="text-body-lg font-medium text-foreground">
                Still have questions?
              </p>
              <p className="mt-1 text-body-sm text-muted">
                Tell me what you want to build.
              </p>
            </div>
            <Link href="/#contact" className="shrink-0">
              <Button variant="outline" size="md">
                Start a Project
                <ArrowUpRight size={15} />
              </Button>
            </Link>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
