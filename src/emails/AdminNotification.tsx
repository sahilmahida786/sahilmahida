import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Link,
  Preview,
} from "@react-email/components";

interface AdminNotificationProps {
  name: string;
  email: string;
  projectType: string;
  message: string;
  timestamp: string;
  sourceUrl: string;
}

export const AdminNotification = ({
  name = "Test User",
  email = "test@example.com",
  projectType = "Website",
  message = "This is a test message.",
  timestamp = new Date().toISOString(),
  sourceUrl = "https://sahilmahida.in",
}: AdminNotificationProps) => {
  return (
    <Html>
      <Head />
      <Preview>🔥 NEW PROJECT INQUIRY — {projectType} — {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Heading style={header}>🔥 NEW PROJECT INQUIRY</Heading>
            <Text style={subtitle}>A potential client has submitted a new project request.</Text>
          </Section>

          <Section style={card}>
            <Heading style={cardTitle}>CUSTOMER INFORMATION</Heading>
            <Text style={label}>Name</Text>
            <Text style={value}>{name}</Text>

            <Text style={label}>Email</Text>
            <Link href={`mailto:${email}`} style={valueLink}>{email}</Link>

            <Text style={label}>Project Type</Text>
            <Text style={value}>{projectType}</Text>
          </Section>

          <Section style={card}>
            <Heading style={cardTitle}>REQUEST DETAILS</Heading>
            <Text style={label}>Submitted:</Text>
            <Text style={value}>{new Date(timestamp).toLocaleString("en-IN")}</Text>

            <Text style={label}>Source:</Text>
            <Text style={value}>SAHIL.OS Contact Form</Text>

            <Text style={label}>Page:</Text>
            <Link href={sourceUrl} style={valueLink}>{sourceUrl}</Link>

            <Text style={label}>Status:</Text>
            <Text style={{ ...value, color: "#3b82f6", fontWeight: "bold" }}>NEW — AWAITING RESPONSE</Text>
          </Section>

          <Section style={card}>
            <Heading style={cardTitle}>CUSTOMER MESSAGE</Heading>
            <Text style={messageBlock}>&quot;{message}&quot;</Text>
          </Section>

          <Section style={actionSection}>
            <Heading style={actionTitle}>QUICK ACTIONS</Heading>
            <Link href={`mailto:${email}`} style={button}>
              ✉️ Email Customer
            </Link>
          </Section>

          <Section style={warningSection}>
            <Text style={warningTitle}>⚠️ ACTION REQUIRED</Text>
            <Text style={warningText}>
              Please review this project inquiry and respond to the customer within 24 hours.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
};

export default AdminNotification;

const main = {
  backgroundColor: "#05070B",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  padding: "40px 0",
};

const container = {
  margin: "0 auto",
  padding: "20px",
  maxWidth: "600px",
  backgroundColor: "#0A0D14",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "12px",
};

const headerSection = {
  padding: "20px 0 30px",
  textAlign: "center" as const,
};

const header = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 10px",
};

const subtitle = {
  color: "#9ca3af",
  fontSize: "16px",
  margin: "0",
};

const card = {
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  borderRadius: "8px",
  padding: "24px",
  marginBottom: "20px",
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

const valueLink = {
  color: "#3b82f6",
  fontSize: "16px",
  textDecoration: "none",
  display: "block",
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

const actionSection = {
  padding: "20px 0",
  textAlign: "center" as const,
};

const actionTitle = {
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0 0 20px",
};

const button = {
  backgroundColor: "#3b82f6",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  margin: "0 10px 10px 0",
};

const warningSection = {
  backgroundColor: "rgba(239, 68, 68, 0.1)",
  border: "1px solid rgba(239, 68, 68, 0.2)",
  borderRadius: "8px",
  padding: "20px",
  marginTop: "20px",
  textAlign: "center" as const,
};

const warningTitle = {
  color: "#ef4444",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0 0 10px",
};

const warningText = {
  color: "#fca5a5",
  fontSize: "14px",
  margin: "0",
  lineHeight: "1.5",
};
