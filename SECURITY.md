# Security Policy

We take the security of this project seriously. If you believe you’ve found a vulnerability, please follow the steps below to report it responsibly.

## Reporting a Vulnerability

- Prefer private disclosure using GitHub Security Advisories:
    - Navigate to the repository’s “Security” tab
    - Click “Report a vulnerability” (or open a new private advisory)
- Alternatively, email: security@yourdomain.com
    - If possible, include a proof-of-concept, impact assessment, and steps to reproduce.
    - Please do not open public issues for security reports.

What to include:
- Affected component or path (file, endpoint, or feature)
- Version/commit hash tested
- Reproduction steps and expected vs. actual behavior
- Impact assessment (e.g., data exposure, privilege escalation)
- Any mitigations or workarounds you identified

Response targets:
- Acknowledgement: within 72 hours
- Initial assessment: within 7 days
- Remediation timeline: shared after triage, based on severity and complexity

## Coordinated Disclosure

- We ask for 90 days from initial acknowledgement to coordinate a fix and release before any public disclosure.
- If an earlier public disclosure is necessary, please coordinate with us so users can be protected.
- We will credit researchers who responsibly disclose (unless you prefer to remain anonymous).

## Supported Versions

- Security fixes are provided for the latest stable release.
- Critical security issues may be backported on a case-by-case basis where feasible.
- Older, unmaintained branches may receive deprecation notices instead of fixes.

## Scope

In scope:
- Application source code and configurations within this repository
- Build and deployment scripts in this repository

Out of scope (non-exhaustive):
- Third-party services/components not maintained in this repo
- Social engineering or phishing
- Denial of Service via excessive request volume without a novel exploit
- Automated scanner reports without a clear, exploitable impact

If in doubt, contact us before starting research.

## Safe Harbor

We support good-faith security research:
- Do not access or exfiltrate data that isn’t yours
- Do not degrade service availability
- Do not violate any laws or breach data protection regulations
  If you follow these guidelines, we will not pursue legal action for your research and reporting.

## Handling of Dependencies

- We monitor and update dependencies regularly (including automated alerts).
- If the issue is in an upstream dependency, we will open an upstream report and track remediation here.

## Secret Handling

- Never include secrets in issues, PRs, or logs.
- If you accidentally commit a secret, rotate it immediately and notify maintainers privately.

## Contact and PGP (optional)

- Primary: security@yourdomain.com
- Please include your PGP public key if you prefer encrypted communication.
- If we publish a maintainer key in the future, it will be referenced here.

## Credits

We appreciate the efforts of security researchers and users who help keep this project safe. If you’d like recognition, let us know when reporting.
