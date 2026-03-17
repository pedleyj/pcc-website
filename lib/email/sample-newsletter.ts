import { type NewsletterData } from './newsletter-template'

/**
 * Sample newsletter based on the March 13, 2026 PCC email.
 * Used for testing the full newsletter flow.
 *
 * Replace this with CMS-driven content when newsletter authoring is built.
 */
export function getSampleNewsletter(unsubscribeUrl: string): NewsletterData {
  return {
    date: 'March 13, 2026',
    preheader: 'Easter is just around the corner, PCC! Find out what we have going on.',
    jumpLinks: ['Family Update', 'Family News', 'Current Series', 'Giving', 'Prayer'],
    sections: [
      // Intro
      {
        html: `<p style="margin: 0 0 16px; font-size: 16px; color: #254b5a; font-weight: 600;">Easter is just around the corner, PCC!</p>
          <p style="margin: 0;">Find out more about all we have going on below and on our website, <a href="https://wearepcc.com" style="color: #31825e; text-decoration: none; font-weight: 500;">wearepcc.com</a>.</p>`,
      },

      // Easter invitations
      {
        html: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #faf8f5; border-radius: 8px; overflow: hidden;">
          <tr><td style="padding: 24px; text-align: center;">
            <p style="margin: 0 0 8px; font-size: 18px; font-weight: 700; color: #254b5a;">Invite Someone to Easter!</p>
            <p style="margin: 0 0 16px; font-size: 14px; color: #505251;">Pick up invitations in the back of the Worship Center to invite your friends and family!</p>
            <a href="https://wearepcc.com/easter" style="display: inline-block; background: #f4b73f; color: #254b5a; padding: 10px 24px; border-radius: 6px; font-size: 14px; font-weight: 600; text-decoration: none;">Learn More</a>
          </td></tr>
        </table>`,
      },

      // Ballet Magnificat
      {
        html: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #faf8f5; border-radius: 8px; overflow: hidden;">
          <tr><td style="padding: 24px;">
            <p style="margin: 0 0 8px; font-size: 18px; font-weight: 700; color: #254b5a;">Ballet Magnificat presents <em>Ruth</em></p>
            <p style="margin: 0 0 16px; font-size: 14px; color: #505251;">PCC is proud to present Ballet Magnificat&rsquo;s captivating production of the ballet <em>Ruth</em>. This premiere Christian ballet company will showcase their technical strength in a ballet that powerfully depicts the human experiences of loss, loneliness, love, and ultimately hope. Don&rsquo;t wait to buy tickets &mdash; this show is likely to sell out!</p>
            <a href="https://wearepcc.com/events" style="display: inline-block; background: #f4b73f; color: #254b5a; padding: 10px 24px; border-radius: 6px; font-size: 14px; font-weight: 600; text-decoration: none;">Tickets &amp; Info</a>
          </td></tr>
        </table>`,
      },

      // Easter Choir
      {
        html: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #faf8f5; border-radius: 8px; overflow: hidden;">
          <tr><td style="padding: 24px;">
            <p style="margin: 0 0 8px; font-size: 18px; font-weight: 700; color: #254b5a;">Join the Easter Choir!</p>
            <p style="margin: 0 0 12px; font-size: 14px; color: #505251;">Looking for a fun way to celebrate Easter? Come be part of our Easter Choir! It&rsquo;s open to everyone &mdash; whether you&rsquo;re a seasoned singer or just love music.</p>
            <p style="margin: 0 0 12px; font-size: 14px; color: #505251;"><strong>Rehearsals:</strong> Sundays, March 15, 22, and 29 after the 10:45am service in the Worship Center.</p>
            <p style="margin: 0 0 12px; font-size: 14px; color: #505251;">The choir will be singing on Palm Sunday and at the Good Friday service.</p>
            <p style="margin: 0; font-size: 14px; color: #505251;">Contact Deanna at <a href="mailto:Dooley2945@gmail.com" style="color: #31825e; text-decoration: none;">Dooley2945@gmail.com</a> to get plugged in!</p>
          </td></tr>
        </table>`,
      },

      // Grill Sunday
      {
        html: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #faf8f5; border-radius: 8px; overflow: hidden;">
          <tr><td style="padding: 24px;">
            <p style="margin: 0 0 8px; font-size: 18px; font-weight: 700; color: #254b5a;">Grill Sunday</p>
            <p style="margin: 0; font-size: 14px; color: #505251;">This Sunday, it&rsquo;s Grill Sunday! You can support high school students going to Mexico with your donation towards hot dogs and hamburgers. Take home lunch and support our students!</p>
          </td></tr>
        </table>`,
      },

      // He Grills
      {
        html: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #faf8f5; border-radius: 8px; overflow: hidden;">
          <tr><td style="padding: 24px;">
            <p style="margin: 0 0 8px; font-size: 18px; font-weight: 700; color: #254b5a;">He Grills &mdash; Men&rsquo;s Event</p>
            <p style="margin: 0 0 12px; font-size: 14px; color: #505251;">Men, have you been to a He Grills event yet? Every 3rd Thursday, we get together to hear inspiring stories, get to know other men, and (of course) EAT!</p>
            <p style="margin: 0; font-size: 14px; color: #505251;"><strong>Thursday, March 19 at 6pm</strong></p>
          </td></tr>
        </table>`,
      },

      // Family Update
      {
        id: 'family-update',
        heading: 'Family Update',
        html: `<p style="margin: 0;">Stay tuned for updates from the PCC family. Watch our Sunday announcements or visit <a href="https://wearepcc.com" style="color: #31825e; text-decoration: none; font-weight: 500;">wearepcc.com</a> for the latest.</p>`,
      },

      // Family News
      {
        id: 'family-news',
        heading: 'Family News',
        html: `<p style="margin: 0;">Did you miss Family News on Sunday? Catch up on the latest at our <a href="https://wearepcc.com/gatherings" style="color: #31825e; text-decoration: none; font-weight: 500;">Gatherings page</a>.</p>`,
      },

      // Current Series
      {
        id: 'current-series',
        heading: 'Current Series',
        html: `<p style="margin: 0 0 16px;">Looking to stay up with the current message series?</p>
          <p style="margin: 0 0 16px;">We&rsquo;re currently in a series called <strong>God&rsquo;s Big Story</strong>. Check out our <a href="https://wearepcc.com/messages" style="color: #31825e; text-decoration: none; font-weight: 500;">Messages page</a> to view the latest message and catch up on the full series.</p>
          <a href="https://wearepcc.com/messages" style="display: inline-block; background: #254b5a; color: #ffffff; padding: 10px 24px; border-radius: 6px; font-size: 14px; font-weight: 600; text-decoration: none;">Watch Latest Message</a>`,
      },

      // Prayer
      {
        id: 'prayer',
        heading: 'Prayer',
        html: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr><td style="padding: 8px 0;">
            <p style="margin: 0 0 12px; font-size: 14px; color: #505251;"><strong>Wednesday Zoom Prayer</strong> &mdash; Join us for our weekly prayer time.</p>
            <p style="margin: 0 0 12px; font-size: 14px; color: #505251;"><strong>Prayer Team</strong> available after Sunday Worship Gatherings.</p>
            <p style="margin: 0 0 16px; font-size: 14px; color: #505251;">Email <a href="mailto:info@wearepcc.com" style="color: #31825e; text-decoration: none;">info@wearepcc.com</a> to receive Prayer Request emails and pray for our congregation.</p>
            <a href="https://wearepcc.com/support/prayer" style="display: inline-block; background: #254b5a; color: #ffffff; padding: 10px 24px; border-radius: 6px; font-size: 14px; font-weight: 600; text-decoration: none;">Submit a Prayer Request</a>
          </td></tr>
        </table>`,
      },
    ],

    givingUpdate: {
      fiscalYear: 'June 1 \u2013 May 31',
      budgetedGiving: '$3,400,000',
      asOfDate: 'March 10, 2026',
      expectedToDate: '$2,870,620',
      givingToDate: '$2,470,848',
      shortfall: '$399,772',
    },

    unsubscribeUrl,
  }
}
