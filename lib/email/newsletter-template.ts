/**
 * PCC Newsletter HTML email template.
 *
 * Uses table-based layout for maximum email client compatibility.
 * Brand colors match the PCC website design system.
 */

export type NewsletterSection = {
  id?: string           // anchor id for jump links
  heading?: string
  html: string          // inner HTML content (paragraphs, images, links, etc.)
}

export type NewsletterData = {
  date: string                   // e.g. "March 13, 2026"
  preheader?: string             // short preview text for inbox
  jumpLinks?: string[]           // e.g. ["Family Update", "Family News", "Giving", "Prayer"]
  heroHtml?: string              // optional hero banner HTML
  sections: NewsletterSection[]
  givingUpdate?: {
    fiscalYear: string
    budgetedGiving: string
    asOfDate: string
    expectedToDate: string
    givingToDate: string
    shortfall: string
  }
  unsubscribeUrl: string
}

const COLORS = {
  navy: '#254b5a',
  navyDark: '#1a3a47',
  teal: '#31825e',
  gold: '#f4b73f',
  sage: '#849c8d',
  cream: '#faf8f5',
  creamDark: '#e8e4df',
  slate: '#505251',
  white: '#ffffff',
}

export function renderNewsletter(data: NewsletterData): string {
  const jumpLinksHtml = data.jumpLinks?.length
    ? `<tr><td style="padding: 24px 32px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr><td align="center" style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; color: ${COLORS.teal};">
            ${data.jumpLinks.map(link => {
              const anchor = link.toLowerCase().replace(/\s+/g, '-')
              return `<a href="#${anchor}" style="color: ${COLORS.teal}; text-decoration: none; margin: 0 8px;">${link}</a>`
            }).join(' &bull; ')}
          </td></tr>
        </table>
      </td></tr>`
    : ''

  const sectionsHtml = data.sections.map(section => {
    const anchorHtml = section.id
      ? `<a id="${section.id}" name="${section.id}"></a>`
      : ''
    const headingHtml = section.heading
      ? `<tr><td style="padding: 0 32px 16px;">
          ${anchorHtml}
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="border-bottom: 3px solid ${COLORS.gold}; padding-bottom: 8px;">
                <h2 style="margin: 0; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 22px; font-weight: 700; color: ${COLORS.navy};">${section.heading}</h2>
              </td>
            </tr>
          </table>
        </td></tr>`
      : (anchorHtml ? `<tr><td>${anchorHtml}</td></tr>` : '')

    return `${headingHtml}
      <tr><td style="padding: 0 32px 32px; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; line-height: 1.6; color: ${COLORS.slate};">
        ${section.html}
      </td></tr>`
  }).join('\n')

  const givingHtml = data.givingUpdate
    ? `<tr><td style="padding: 0 32px 32px;">
        <a id="giving" name="giving"></a>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td style="border-bottom: 3px solid ${COLORS.gold}; padding-bottom: 8px;">
              <h2 style="margin: 0; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 22px; font-weight: 700; color: ${COLORS.navy};">Giving Update</h2>
            </td>
          </tr>
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 16px; border-radius: 8px; overflow: hidden;">
          <tr><td style="background: ${COLORS.cream}; padding: 20px; border-radius: 8px; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <p style="margin: 0 0 4px; font-size: 13px; color: ${COLORS.sage};">Fiscal Year: ${data.givingUpdate.fiscalYear}</p>
            <p style="margin: 0 0 4px; font-size: 13px; color: ${COLORS.sage};">Budgeted Giving: ${data.givingUpdate.budgetedGiving}</p>
            <p style="margin: 0 0 16px; font-size: 12px; color: ${COLORS.sage};">As of ${data.givingUpdate.asOfDate}</p>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="padding: 8px 0; font-size: 14px; color: ${COLORS.slate};">Expected Giving to Date</td>
                <td align="right" style="padding: 8px 0; font-size: 14px; font-weight: 600; color: ${COLORS.navy};">${data.givingUpdate.expectedToDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 14px; color: ${COLORS.slate};">Giving to Date</td>
                <td align="right" style="padding: 8px 0; font-size: 14px; font-weight: 600; color: ${COLORS.teal};">${data.givingUpdate.givingToDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-top: 1px solid ${COLORS.creamDark}; font-size: 14px; color: ${COLORS.slate};">Shortfall to Date</td>
                <td align="right" style="padding: 8px 0; border-top: 1px solid ${COLORS.creamDark}; font-size: 14px; font-weight: 600; color: #c0392b;">${data.givingUpdate.shortfall}</td>
              </tr>
            </table>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top: 16px;">
              <tr><td align="center" style="background: ${COLORS.gold}; border-radius: 6px;">
                <a href="https://wearepcc.churchcenter.com/giving" target="_blank" style="display: inline-block; padding: 10px 24px; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 600; color: ${COLORS.navy}; text-decoration: none;">Give Online</a>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </td></tr>`
    : ''

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>PCC Newsletter — ${data.date}</title>
  ${data.preheader ? `<span style="display:none;font-size:1px;color:#faf8f5;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${data.preheader}</span>` : ''}
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: ${COLORS.cream}; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: ${COLORS.cream};">
    <tr><td align="center" style="padding: 24px 16px;">

      <!-- Main container -->
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; width: 100%; background-color: ${COLORS.white}; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">

        <!-- Header -->
        <tr><td style="background-color: ${COLORS.navy}; padding: 32px; text-align: center;">
          <h1 style="margin: 0; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 28px; font-weight: 700; color: ${COLORS.white}; letter-spacing: -0.5px;">Peninsula Covenant Church</h1>
          <p style="margin: 8px 0 0; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: rgba(255,255,255,0.8);">${data.date}</p>
        </td></tr>

        <!-- Jump links -->
        ${jumpLinksHtml}

        <!-- Hero -->
        ${data.heroHtml ? `<tr><td style="padding: 0 32px 24px;">${data.heroHtml}</td></tr>` : ''}

        <!-- Sections -->
        ${sectionsHtml}

        <!-- Giving -->
        ${givingHtml}

        <!-- Footer -->
        <tr><td style="background-color: ${COLORS.navy}; padding: 32px; text-align: center;">
          <p style="margin: 0; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 600; color: ${COLORS.white};">Peninsula Covenant Church</p>
          <p style="margin: 6px 0 0; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; color: rgba(255,255,255,0.7);">3560 Farm Hill Boulevard, Redwood City, CA 94061</p>
          <p style="margin: 4px 0 0; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; color: rgba(255,255,255,0.7);">
            <a href="tel:650-365-8094" style="color: rgba(255,255,255,0.7); text-decoration: none;">650-365-8094</a> &bull;
            <a href="mailto:info@wearepcc.com" style="color: rgba(255,255,255,0.7); text-decoration: none;">info@wearepcc.com</a>
          </p>
          <p style="margin: 16px 0 0; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px;">
            <a href="https://wearepcc.com" style="color: ${COLORS.gold}; text-decoration: none; margin: 0 6px;">Website</a> &bull;
            <a href="https://www.facebook.com/wearepcc" style="color: ${COLORS.gold}; text-decoration: none; margin: 0 6px;">Facebook</a> &bull;
            <a href="https://www.instagram.com/wearepcc" style="color: ${COLORS.gold}; text-decoration: none; margin: 0 6px;">Instagram</a> &bull;
            <a href="https://www.youtube.com/@wearepcc" style="color: ${COLORS.gold}; text-decoration: none; margin: 0 6px;">YouTube</a>
          </p>
          <p style="margin: 20px 0 0; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; color: rgba(255,255,255,0.5);">
            <a href="${data.unsubscribeUrl}" style="color: rgba(255,255,255,0.5); text-decoration: underline;">Unsubscribe</a>
          </p>
          <p style="margin: 8px 0 0; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; color: rgba(255,255,255,0.4);">&copy; ${new Date().getFullYear()} Peninsula Covenant Church. All rights reserved.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}
