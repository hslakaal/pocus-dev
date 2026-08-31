# Cardiac View Calculator

Here is your final, complete master prompt for Lovable, integrating the full 5-view workflow, M-mode and VTI constraints, IVC collapsibility calculations, Right Atrial Pressure (RAP) estimation, local caching, and the optional email report function.

Master Lovable Prompt

Role & Goal

Build a mobile-first, responsive Point-of-Care Ultrasound (POCUS) and Echocardiography web calculator optimized for mobile browsers. The app workflow is organized strictly by ultrasound views (Demographics → PLAX → PSAX → A4C → Subcostal IVC → Summary Report). All measurements are limited strictly to M-mode inputs, with LVOT VTI as the single Doppler exception. Data is cached locally across screens to generate a dynamic calculation table and an optional emailable report.

Core App Architecture & Navigation

Mobile-First Layout: High-contrast, touch-friendly UI designed for small mobile screens.

View-Based Workflow: Linear progression moving screen-by-screen through specific cardiac views.

Data Persistence: Silently cache all form entries in browser local storage (localStorage) as the user advances through each view.

PWA Features: Include a basic PWA manifest to support "Add to Home Screen" on iOS and Android.

Page-by-Page Specifications

Page 1: Welcome & Demographics

Visual PHI Disclaimer Banner: Prominently display a visual alert at the top: "This application is for educational/reference purposes only and is not a secure medical platform. Any PHI entered is done at the user's own risk."



Input Fields: Height (cm or in), Weight (kg or lbs), Age, Gender (Male/Female), and MRN.

Action: "Next View" button saving demographics locally.

Page 2: PLAX View (Parasternal Long Axis)

Top Container: Reference GIF/image placeholder demonstrating proper PLAX acquisition.

Bottom Text Inputs (M-Mode strictly):

LV End-Diastolic Diameter (LVEDD)

Interventricular Septal Thickness (IVSd)

Posterior Wall Thickness (PWd)

LV End-Systolic Diameter (LVESD)

Action: Save entries locally; "Next View" button.

Page 3: PSAX View (Parasternal Short Axis)

Top Container: Reference GIF/image placeholder for PSAX view.

Bottom Text Inputs (M-Mode / Dimensions):

PSAX LV Diastolic Diameter (PSAXdiastole​)

PSAX LV Systolic Diameter (PSAXsystole​)

Action: Save entries locally; "Next View" button.

Page 4: A4C View (Apical 4-Chamber)

Top Container: Reference GIF/image placeholder for A4C view.

Bottom Text Inputs:

TAPSE (Tricuspid Annular Plane Systolic Excursion - M-Mode)

LVOT Diameter (cm - required for stroke volume derivation)

LVOT VTI (cm - Pulsed-Wave Doppler exception)

Heart Rate (HR, bpm)

Action: Save entries locally; "Next View" button.

Page 5: Subcostal View (Inferior Vena Cava)

Top Container: Reference GIF/image placeholder showing proper IVC acquisition and measurement technique.

Bottom Text Inputs:

Maximum IVC Diameter (IVCmax​, cm)

Minimum IVC Diameter (IVCmin​, cm)

Action: Save entries locally; "Generate Report" button.

Page 6: Cardiac Report & Calculation Summary

Summary Table: Display a structured table matching all inputs against real-time calculated parameters:

BSA: Derived using Mosteller formula (BSA=3600Height(cm)×Weight(kg)​​)

Estimated Ejection Fraction (EF): Calculated via Teichholz formula derived from PLAX LVEDD/LVESD

Fractional Shortening (FS): LVEDDLVEDD−LVESD​×100

Stroke Volume (SV): LVOT Area×LVOT VTI (where Area=π×(2LVOT Diameter​)2)

Cardiac Output (CO): 1000SV×HR​



Cardiac Index (CI): BSACO​



IVC Collapsibility Index & Estimated RAP: Calculate collapsibility percentage (IVCmax​IVCmax​−IVCmin​​×100) and automatically estimate Right Atrial Pressure (RAP) ranges (e.g., <50% collapse with normal/large IVC → ~15 mmHg; >50% collapse with small/normal IVC → ~3 mmHg; intermediate → ~8 mmHg).

TAPSE: Raw measurement vs standard reference ranges

Report Delivery: Include an optional "Email Report" button that compiles the summary table into a formatted text body and opens a native mailto: draft.

Technical Stack

React + Tailwind CSS + TypeScript running math client-side.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://pocushocus.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a0612c23-8246-44a1-9371-5b72ae409f9b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
