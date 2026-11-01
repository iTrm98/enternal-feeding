# Enteral Feeding Calculator

A web-based calculator for planning **enteral nutrition**. Choose a feeding formula, enter the patient's energy, protein, and fluid needs, and the calculator works out the volume, rate, and nutrient totals, then shows how much of each goal is covered.

Built with HTML, Tailwind CSS, Chart.js, and vanilla JavaScript. No build step.

## Features

- **Adult and Pediatric modes** with a separate formula list for each
- **Searchable formula selection**, with the option to add more than one primary formula and compare them side by side
- **Large built-in formula library**: 70 adult formulas and 7 pediatric formulas
- **Modular formulas**: 11 modular products (fiber, protein, glutamine and arginine, MCT, carbohydrate, and thickener) that can be added on top of the primary formula
- **Client needs**: enter energy (kcal), protein (g), and fluid (mL) targets
- **Feeding goal slider** from 1% to 100% of the energy target
- **Feeding period**: continuous feeding (3 to 24 hours per day) or intermittent feeding (every 3, 4, 6, or 8 hours)
- **Propofol (1%)**: enter the volume (mL/hr) and duration (hrs/day) to count its calories in the plan
- **Detailed results**: volume, rate, number of cans, calories, protein, fat, carbohydrates, fiber, water, and sodium, potassium, magnesium, phosphorus, and calcium
- **Goal comparison charts** showing how much of the energy, protein, and fluid targets the primary formula, modulars, and propofol cover
- **Source links** shown next to formulas that have a verified product reference
- **Responsive layout** for desktop, tablet, and mobile

## Formula Categories

**Adult:** Standard, with Fibers, Clear ONS, Pulmonary, Surgery, High Calorie, Diabetic, Renal, Hepatic, and Semielemental & Elemental.

**Pediatric:** Standard (Liquid) and High Calorie (Liquid).

## How to Use

1. Choose **Adult** or **Pediatric**.
2. Search for a primary formula and click **Add**.
3. Optionally add one or more **modular formulas**.
4. Enter the patient's **energy, protein, and fluid needs**.
5. Set the **feeding goal** and **feeding period**.
6. Optionally enter **propofol** volume and duration.
7. Click **Calculate** to see the breakdown, or **Reset All** to start over.

## Getting Started

No installation needed.

1. Clone the repository:
   ```bash
   git clone https://github.com/iTrm98/enteral-feeding.git
   ```
2. Open `index.html` in any modern browser.

An internet connection is required, because Tailwind CSS, Chart.js, and the Inter font load from CDNs.

## Project Structure

```
enteral-feeding/
├── index.html    # Page layout and structure
├── style.css     # Custom styles and animations
├── script.js     # Formula and modular data, calculation logic, and UI behavior
└── README.md
```

## Tech Stack

- HTML5
- [Tailwind CSS](https://tailwindcss.com/) (CDN)
- [Chart.js](https://www.chartjs.org/) (CDN)
- Vanilla JavaScript
- Inter font (Google Fonts)

## Disclaimer

This tool is for educational and professional reference only. It does not replace clinical judgment. Product values come from manufacturer information and can change, so verify them against the current product label and your institution's protocols before applying results to patient care.

## Author

**Turki Alsufyani**: [GitHub](https://github.com/iTrm98)