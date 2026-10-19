---
title: "About Our Data | Lead Paint Roster"
description: "Sources and cleanup method."
canonical: https://leadpaintroster.com/about-our-data/
---

# About our data

* **New Jersey:** DCA lists of certified lead evaluation contractors (revised Aug 11, 2026) and lead abatement contractors (revised July 15, 2026), parsed from PDF. Firms on both lists are merged.
* **New York:** EPA Lead-Based Paint Professional Locator, all NY firms certified for evaluation or abatement, retrieved 2026-10-12.
* **Massachusetts:** licensed private lead inspector list (individuals), grouped into firms by business email domain or company name.
* **Cleanup:** expired certifications dropped; case and phone formats normalized; counties from ZIP or city (GeoNames, CC BY 4.0). All changes are in data/cleanup-log.csv.
* **Not yet included:** NJDOH individual licensees, EPA-certified individuals in NY, and the MA deleading contractor list.
