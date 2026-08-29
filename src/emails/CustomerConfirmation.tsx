import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Preview,
} from "@react-email/components";

interface CustomerConfirmationProps {
  name: string;
  projectType: string;
  message: string;
}

export const CustomerConfirmation = ({
  name = "Test User",
  projectType = "Website",
  message = "This is a test message.",
}: CustomerConfirmationProps) => {
  return (
    <Html>
      <Head />
      <Preview>✅ Project inquiry received — SAHIL.OS</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Heading style={header}>SAHIL.OS</Heading>
          </Section>

          <Section style={contentSection}>
            <Text style={greeting}>Hello {name},</Text>
            <Text style={paragraph}>
              Thank you for contacting Sahil Mahida / SAHIL.OS.
            </Text>
            <Text style={paragraph}>
              Your project inquiry has been successfully received.
            </Text>
          </Section>

          <Section style={card}>
            <Heading style={cardTitle}>PROJECT DETAILS</Heading>
            <Text style={label}>Project</Text>
            <Text style={value}>{projectType}</Text>

            <Text style={label}>Message</Text>
            <Text style={messageBlock}>&quot;{message}&quot;</Text>
          </Section>

          <Section style={contentSection}>
            <Heading style={subHeading}>WHAT HAPPENS NEXT</Heading>
            <Text style={paragraph}>
              I&apos;ll review your requirements and respond within 24 hours.
            </Text>
            <Text style={paragraph}>
              If additional information is required, I&apos;ll contact you using the details provided in your inquiry.
            </Text>
          </Section>

          <Hr style={divider} />

          <Section style={footer}>
            <Text style={footerText}>Regards,</Text>
            <Text style={signatureName}>Sahil Mahida</Text>
            <Text style={signatureTitle}>Full-Stack Python Developer</Text>
            <Text style={signatureCompany}>SAHIL.OS</Text>
            
            <Text style={footerLink}>
              Website: <a href="https://sahilmahida.in" style={link}>sahilmahida.in</a>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default CustomerConfirmation;

const main = {
  backgroundColor: "#05070B",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  padding: "40px 0",
};

const container = {
  margin: "0 auto",
  padding: "30px",
  maxWidth: "600px",
  backgroundColor: "#0A0D14",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "12px",
};

const headerSection = {
  paddingBottom: "20px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  marginBottom: "30px",
};

const header = {
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0",
  letterSpacing: "1px",
};

const contentSection = {
  marginBottom: "30px",
};

const greeting = {
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 15px",
};

const paragraph = {
  color: "#d1d5db",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 15px",
};

const subHeading = {
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0 0 15px",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
};

const card = {
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  borderRadius: "8px",
  padding: "24px",
  marginBottom: "30px",
};

const cardTitle = {
  color: "#60a5fa",
  fontSize: "14px",
  fontWeight: "bold",
  letterSpacing: "1px",
  textTransform: "uppercase" as const,
  margin: "0 0 20px",
};

const label = {
  color: "#9ca3af",
  fontSize: "12px",
  textTransform: "uppercase" as const,
  margin: "0 0 4px",
};

const value = {
  color: "#ffffff",
  fontSize: "16px",
  margin: "0 0 20px",
};

const messageBlock = {
  color: "#ffffff",
  fontSize: "16px",
  lineHeight: "1.6",
  padding: "16px",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  borderRadius: "6px",
  borderLeft: "4px solid #3b82f6",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const divider = {
  borderColor: "rgba(255, 255, 255, 0.1)",
  margin: "30px 0",
};

const footer = {
  textAlign: "left" as const,
};

const footerText = {
  color: "#9ca3af",
  fontSize: "16px",
  margin: "0 0 10px",
};

const signatureName = {
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0 0 2px",
};

const signatureTitle = {
  color: "#9ca3af",
  fontSize: "14px",
  margin: "0 0 2px",
};

const signatureCompany = {
  color: "#60a5fa",
  fontSize: "14px",
  fontWeight: "bold",
  margin: "0 0 20px",
};

const footerLink = {
  color: "#9ca3af",
  fontSize: "14px",
  margin: "0",
};

const link = {
  color: "#3b82f6",
  textDecoration: "none",
};
