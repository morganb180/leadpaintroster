---
name: lead-paint-roster-request-quote
description: Request quotes from certified lead inspectors, risk assessors and abatement firms in NJ, NY and MA for a homeowner via Lead Paint Roster; the homeowner confirms by email before anything is sent.
---

# Request quotes through Lead Paint Roster

Only do this when the homeowner asked you to get quotes and agreed to share their name, email (and phone, if given) with up to three certified firms.

## Steps

1. Optionally find a firm first with the search skill or `GET https://leads.radonroster.com/api/firms?site=leadpaint&zip=<ZIP>`, and pass its `id` as `firm`.
2. Send `POST https://leads.radonroster.com/api/agent/quote?site=leadpaint` with `Content-Type: application/json` and these fields:
   - Required: `name`, `email`, `zip` (zip (NJ, NY or MA)), `need`, and `consent: true`.
   - Optional: `phone`, `firm`, `message`, and `agent` (your app's name, shown to the homeowner). 
   - Values for `need`:
   - `inspection`: Lead inspection
   - `risk_assessment`: Lead risk assessment
   - `abatement`: Lead abatement
   - `not_sure`: Not sure (inspection or risk assessment)
3. You get `202` with `status: "pending_confirmation"`. Tell the homeowner to open the email from Lead Paint Roster and click **Confirm** within 24 hours.
   - Nothing is sent to any firm until they confirm.
   - They can opt in to occasional tips on that page; you cannot do it for them.
4. After confirmation, the request goes to the chosen firm (if any) plus up to two other nearby certified firms, and the homeowner gets a copy listing who received it.

You can also use the MCP tool `request_quote` at `https://leads.radonroster.com/mcp?site=leadpaint`; it follows the same flow.

## Errors

- `422 consent_required`: the homeowner didn't agree. Ask them; never set `consent` yourself.
- `400 <field>`: fix that field.
- `404 no_firms`: no certified firm serves that location or need.
- `429`: rate limited. Don't retry in a loop; wait an hour or send the homeowner to https://leadpaintroster.com/quotes/.

## Spec

https://leadpaintroster.com/openapi.json
