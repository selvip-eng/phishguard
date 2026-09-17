import type { EmailData } from '../types';

/**
 * Safely parse EML content without executing anything or rendering HTML directly.
 */
export const parseEml = (rawEml: string): EmailData => {
  const data: EmailData = { sender: '', subject: '', body: '', headers: {}, raw: rawEml };
  
  // Normalize line endings
  const normalized = rawEml.replace(/\r\n/g, '\n');
  const splitIndex = normalized.indexOf('\n\n');
  
  if (splitIndex === -1) {
    data.body = normalized;
    return data;
  }

  const headerPart = normalized.substring(0, splitIndex);
  let bodyPart = normalized.substring(splitIndex).trim();

  // Parse headers safely
  const headerLines = headerPart.split('\n');
  let currentKey = '';
  
  for (const line of headerLines) {
    if (line.match(/^\s+/) && currentKey) {
      data.headers![currentKey] += ' ' + line.trim();
    } else {
      const match = line.match(/^([^:]+):\s*(.*)$/);
      if (match) {
        currentKey = match[1].toLowerCase();
        data.headers![currentKey] = match[2].trim();
      }
    }
  }

  data.sender = data.headers!['from'] || '';
  data.replyTo = data.headers!['reply-to'] || '';
  data.subject = data.headers!['subject'] || '';

  // Very basic cleanup of HTML bodies for text analysis
  // We extract URLs first so we don't lose them
  bodyPart = bodyPart.replace(/<br\s*\/?>/gi, '\n');
  bodyPart = bodyPart.replace(/<p[^>]*>/gi, '\n');
  bodyPart = bodyPart.replace(/<\/p>/gi, '\n');
  // Strip all other HTML tags safely
  bodyPart = bodyPart.replace(/<[^>]+>/g, ' ');

  // Attempt to decode base64 bodies or quoted-printable minimally if easy,
  // but for a safe basic parser, we assume standard text or decoded input 
  // (a robust library would be needed for full MIME unwrapping).
  
  data.body = bodyPart;

  return data;
};

/**
 * Redact sensitive info like suspected passwords or OTPs from being displayed back.
 */
export const redactSensitiveInfo = (text: string): string => {
  let redacted = text;
  // Redact passwords following keywords
  redacted = redacted.replace(/(password|pwd|passcode)[\s:=]+([^\s,;]+)/gi, '$1: [REDACTED]');
  // Redact OTPs
  redacted = redacted.replace(/(otp|code|pin)[\s:=]+(\d{4,8})/gi, '$1: [REDACTED]');
  // Redact generic credit card patterns (basic)
  redacted = redacted.replace(/\b(?:\d[ -]*?){13,16}\b/g, '[REDACTED CC]');
  return redacted;
};

