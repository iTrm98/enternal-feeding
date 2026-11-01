/**
 * ENTERAL FEEDING CALCULATOR ENGINE
 */

// --- 1. DATA & CONSTANTS ---

let adultFormulaData = null;
let pediatricFormulaData = null;
let modularData = null;
let allFormulaNames = []; 
let currentFormulaMode = 'Adult'; 

// UPDATED: Only links explicitly verified in your spreadsheet files are added. 
// 

//Line are the new formulas ----------------------------------------------------
 const adultFormulaDataJSON = `{
    "Standard": {
        "Ensure 1kcal/mL (Abbott) Regular": { "kcal": 201, "volume": 200, "carbs": 27.12, "fat": 6.72, "protein": 8, "na": 176, "k": 296, "mg": 40, "p": 124, "ca": 124, "h2o": 170.2, "fiber": 0, "ref": "https://www.family.abbott/sa-ar/ensure/products/ensure-liquid.html" },
        "Surenutri 1kcal/mL (Almraie)": { "kcal": 200, "volume": 200, "carbs": 24.8, "fat": 7.6, "protein": 8.1, "na": 180, "k": 278, "mg": 31.6, "p": 97.8, "ca": 124, "h2o": 0, "fiber": 0, "ref": null },
        "Resource optomum 1.08kcal/mL (Nestle)": { "kcal": 255, "volume": 237, "carbs": 35.1, "fat": 9, "protein": 9, "na": 209, "k": 318, "mg": 43, "p": 97, "ca": 121, "h2o": 0, "fiber": 0, "ref": "https://www.nestlehealthscience-me.com/en/brands/resource/resource-optimum" },
        "EnergyZip 1kcal/mL": { "kcal": 200, "volume": 200, "carbs": 27.32, "fat": 6.7, "protein": 3.8, "na": 195.5, "k": 299.04, "mg": 43.52, "p": 137.886, "ca": 138.736, "h2o": 0, "fiber": 0, "ref": null }
    },
    "with Fibers": {
        "Jevity 1.08kcal/mL (Abbott)": { "kcal": 250, "volume": 237, "carbs": 36.7, "fat": 8.2, "protein": 10.5, "na": 220, "k": 372, "mg": 69, "p": 198, "ca": 216, "h2o": 198, "fiber": 3.4, "ref": null },
        "Surenutri Oral High Calorie with fiber 1.5kcal/mL": { "kcal": 300, "volume": 200, "carbs": 41.6, "fat": 9.16, "protein": 11.4, "na": 197.7, "k": 345, "mg": 38.4, "p": 168, "ca": 260, "h2o": 0, "fiber": 2.87, "ref": null },
        "Fresubin 2 kcal with fiber Neutal 2kcal/mL": { "kcal": 400, "volume": 200, "carbs": 43.6, "fat": 15.6, "protein": 20, "na": 120, "k": 320, "mg": 32, "p": 240, "ca": 410, "h2o": 134, "fiber": 3, "ref": null },
        "Fresubin 2 kcal with fiber Choclate 2kcal/mL": { "kcal": 400, "volume": 200, "carbs": 43.4, "fat": 15.6, "protein": 20, "na": 120, "k": 320, "mg": 32, "p": 240, "ca": 410, "h2o": 140, "fiber": 3.2, "ref": null },
        "Fortisip multifiber 1.5kcal/mL (Nutricia) Vanilla and strawberry": { "kcal": 308, "volume": 200, "carbs": 36.8, "fat": 11.6, "protein": 12, "na": 178, "k": 318, "mg": 48, "p": 154, "ca": 182, "h2o": 152, "fiber": 4.4, "ref": null },
        "Fortisip multifiber 1.5kcal/mL (Nutricia) Choclate": { "kcal": 308, "volume": 200, "carbs": 36.8, "fat": 11.6, "protein": 12, "na": 178, "k": 318, "mg": 48, "p": 154, "ca": 182, "h2o": 152, "fiber": 4.6, "ref": "https://nutricia.com.au/adult/wp-content/uploads/sites/7/2022/03/Fortisip_MF_Factsheet_AUS_Feb_2022.pdf" },
        "Fibersource 1.2 NH 1.2kcal/mL (Nestle)": { "kcal": 300, "volume": 250, "carbs": 41, "fat": 10, "protein": 13.5, "na": 209, "k": 480, "mg": 85, "p": 240, "ca": 121, "h2o": 202, "fiber": 3.8, "ref": "https://www.nestlehealthscience-me.com/en/brands/resource/resource-optimum" }
    },
    "Clear ONS": {
        "Resource Beverage 1.06kcal/mL (Nestle) Orange": { "kcal": 251, "volume": 237, "carbs": 54, "fat": 0, "protein": 9, "na": 71, "k": 0, "mg": 0, "p": 171, "ca": 0, "h2o": 196, "fiber": 0, "ref": null },
        "Resource Beverage 1.06kcal/mL (Nestle) Peach": { "kcal": 251, "volume": 237, "carbs": 54, "fat": 0, "protein": 9, "na": 71, "k": 0, "mg": 0, "p": 171, "ca": 0, "h2o": 196, "fiber": 0, "ref": null },
        "Resource Beverage 1.06kcal/mL (Nestle) Wildberry": { "kcal": 251, "volume": 237, "carbs": 54, "fat": 0, "protein": 9, "na": 71, "k": 0, "mg": 0, "p": 171, "ca": 0, "h2o": 196, "fiber": 0, "ref": null },
        "Fortijuice 1.5kcal/mL (Nutricia) Strawberry": { "kcal": 300, "volume": 200, "carbs": 67, "fat": 0, "protein": 8, "na": 19.4, "k": 19.4, "mg": 4, "p": 24, "ca": 60, "h2o": 152, "fiber": 0, "ref": "https://www.nutricia.co.za/upload/product%20pdfs/Fortijuce_strawberry_%20Fact%20Sheet%20SA%20-%20FC.pdf" },
        "Fortijuice 1.5kcal/mL (Nutricia) Apple": { "kcal": 300, "volume": 200, "carbs": 67, "fat": 0, "protein": 7.8, "na": 20, "k": 18, "mg": 4, "p": 24, "ca": 60, "h2o": 152, "fiber": 0, "ref": "https://nutricia.com.au/adult/wp-content/uploads/sites/7/2021/07/Fortijuce_Factsheet_AUS_April_2021.pdf" },
        "Fortijuice 1.5kcal/mL (Nutricia) Orange": { "kcal": 300, "volume": 200, "carbs": 67, "fat": 0, "protein": 7.8, "na": 17.1, "k": 19.38, "mg": 3.28, "p": 24, "ca": 60, "h2o": 152, "fiber": 0, "ref": "https://nutricia.com.au/adult/wp-content/uploads/sites/7/2021/07/Fortijuce_Factsheet_AUS_April_2021.pdf" }
    },
    "Pulmonary Formulas": {
        "Nutren Pulmonary 1.5kcal/mL (Nestle) Vanilla": { "kcal": 375, "volume": 250, "carbs": 25, "fat": 23.7, "protein": 17, "na": 292, "k": 468, "mg": 120, "p": 300, "ca": 300, "h2o": 195, "fiber": 0, "ref": null },
        "Pulmocare 1.5kcal/mL (Abbott)": { "kcal": 355, "volume": 237, "carbs": 25, "fat": 22.1, "protein": 14.8, "na": 360, "k": 550, "mg": 100, "p": 300, "ca": 310, "h2o": 186, "fiber": 0, "ref": null },
        "Oxepa 1.5kcal/mL (Abbott)": { "kcal": 759, "volume": 500, "carbs": 53, "fat": 46.85, "protein": 31.25, "na": 655, "k": 980, "mg": 160, "p": 500, "ca": 530, "h2o": 393, "fiber": 0, "ref": null }
    },
    "Surgery Formula": {
        "Impact Advance Recovery 1.2kcal/mL (Nestle)": { "kcal": 280, "volume": 250, "carbs": 20, "fat": 11, "protein": 26, "na": 270, "k": 600, "mg": 105, "p": 350, "ca": 380, "h2o": 203, "fiber": 0, "ref": null },
        "Impact Enteral 1.02kcal/mL (Nestle-close system)": { "kcal": 510, "volume": 500, "carbs": 67, "fat": 14, "protein": 28, "na": 535, "k": 670, "mg": 115, "p": 360, "ca": 400, "h2o": 425, "fiber": 0, "ref": "https://www.nestlehealthscience.co.za/brands/impact/impact-enteral" },
        "Cubitan 1.24kcal/mL (Nutricia)": { "kcal": 248, "volume": 200, "carbs": 29, "fat": 17.6, "protein": 7, "na": 100, "k": 300, "mg": 84, "p": 364, "ca": 450, "h2o": 160, "fiber": 0, "ref": "https://nutricia.com.au/wp-content/uploads/2020/08/Cubitan_Factsheet_AUS_June_2020.pdf" },
        "Atempro 1.51kcal/mL (Sierra) Vanilla": { "kcal": 302, "volume": 200, "carbs": 34.6, "fat": 10, "protein": 16.6, "na": 256, "k": 500, "mg": 60, "p": 240, "ca": 230, "h2o": 0, "fiber": 3.4, "ref": null },
        "Atempro 1.51kcal/mL (Sierra) Tropical": { "kcal": 302, "volume": 200, "carbs": 34.6, "fat": 10, "protein": 16.6, "na": 256, "k": 500, "mg": 60, "p": 240, "ca": 230, "h2o": 0, "fiber": 3.4, "ref": null }
    }, 
    "High Calorie Formula": {
        "Ensure plus 1.5kcal/mL (Abbott)": { "kcal": 300, "volume": 200, "carbs": 40.4, "fat": 9.84, "protein": 12.5, "na": 184, "k": 320, "mg": 60, "p": 200, "ca": 240, "h2o": 154.86, "fiber": 0, "ref": "https://www.family.abbott/sa-ar/ensure/products/ensure-liquid-plus.html" },
        "Ensure Advance Plus 1.5kcal/mL (Abbott)": { "kcal": 330, "volume": 220, "carbs": 37, "fat": 11, "protein": 20, "na": 330, "k": 594, "mg": 55, "p": 260, "ca": 499, "h2o": 168, "fiber": 1.7, "ref": "https://www.abbottnutrition.ie/downloads/1.-Ensure-Plus-Advance-datasheet-Ireland-version-3-October-2019.pdf" },
        "Surenutri Oral Supplement High Calorie 1.5kcal/mL": { "kcal": 300, "volume": 200, "carbs": 41.6, "fat": 9.16, "protein": 11.4, "na": 197.7, "k": 345, "mg": 38.4, "p": 168, "ca": 260, "h2o": 0, "fiber": 2.87, "ref": "https://www.abbottnutrition.ie/downloads/1.-Ensure-Plus-Advance-datasheet-Ireland-version-3-October-2019.pdf" },
        "Resource energy 1.5kcal/mL (Nestle)": { "kcal": 302.8, "volume": 200, "carbs": 42, "fat": 10, "protein": 11.2, "na": 160, "k": 340, "mg": 56, "p": 160, "ca": 160, "h2o": 155, "fiber": 1, "ref": "https://www.abbottnutrition.ie/downloads/1.-Ensure-Plus-Advance-datasheet-Ireland-version-3-October-2019.pdf" },
        "Resource Support Plus 2kcal/mL (Nestle)": { "kcal": 255, "volume": 125, "carbs": 26, "fat": 11, "protein": 11.5, "na": 94, "k": 250, "mg": 31, "p": 162, "ca": 231, "h2o": 78.7, "fiber": 0, "ref": null },
        "Resource 2kcal/ml (Nestle)": { "kcal": 400, "volume": 200, "carbs": 42.8, "fat": 17.4, "protein": 18, "na": 220, "k": 380, "mg": 40, "p": 240, "ca": 350, "h2o": 140.8, "fiber": 0, "ref": "https://drive.google.com/file/d/1qMEdjN2zMAcG98R3cAd1k9jiZ5gzAXN_/view" },
        "Forticare 1.63kcal/mL (Nutricia)": { "kcal": 204, "volume": 125, "carbs": 19.1, "fat": 6.6, "protein": 11, "na": 137.5, "k": 269, "mg": 35, "p": 150, "ca": 212.5, "h2o": 0, "fiber": 2.6, "ref": "https://www.nutricia.co.za/upload/Forticare_all-flavours_Fact-Sheet-SA-2.pdf" },
        "Hyperdrink 2kcal/mL (Sierra)": { "kcal": 400, "volume": 200, "carbs": 46, "fat": 16, "protein": 20, "na": 170, "k": 440, "mg": 60, "p": 320, "ca": 336, "h2o": 0, "fiber": 0, "ref": null },
        "Fortisip 1.5kcal/mL (Nutricia)": { "kcal": 300, "volume": 200, "carbs": 36.8, "fat": 11.6, "protein": 12, "na": 180, "k": 318, "mg": 46, "p": 156, "ca": 182, "h2o": 156, "fiber": 0, "ref": null },
        "Fortisip Copmact 2.4kcal/mL (Nutricia)": { "kcal": 300, "volume": 125, "carbs": 37.1, "fat": 11.6, "protein": 12, "na": 120, "k": 295, "mg": 41, "p": 218, "ca": 218, "h2o": 80, "fiber": 0, "ref": "https://www.nutricia.co.uk/hcp/pim-products/fortisip-compact.html#accordion-f265d6fcdc-item-b8eafc604c" },
        "Fortisip Copmact Protien 2.4kcal/mL (Nutricia)": { "kcal": 300, "volume": 125, "carbs": 30.5, "fat": 11.8, "protein": 18, "na": 50, "k": 131, "mg": 68.8, "p": 375, "ca": 438, "h2o": 78.8, "fiber": 0, "ref": "https://nutricia.com.au/adult/wp-content/uploads/sites/7/2022/03/Fortisip_Compact_Protein_Factsheet_AUS_Feb_2022.pdf" },
        "Peptisens 1.5kcal/mL": { "kcal": 300, "volume": 200, "carbs": 32, "fat": 10.6, "protein": 18.2, "na": 238, "k": 500, "mg": 56, "p": 160, "ca": 214, "h2o": 0, "fiber": 1.6, "ref": null },
        "EnergyZip 1.5kcal/mL": { "kcal": 300, "volume": 200, "carbs": 40, "fat": 10.2, "protein": 11.4, "na": 284, "k": 480, "mg": 70, "p": 230, "ca": 280, "h2o": 0, "fiber": 0, "ref": "https://drive.google.com/drive/u/0/folders/1_USM1UcbRjuOYge77BmrqPhdT22Pi4YT" },
        "FontActiv Energy 1.5kcal/mL": { "kcal": 300, "volume": 200, "carbs": 43, "fat": 9.16, "protein": 11.4, "na": 198, "k": 345, "mg": 39.1, "p": 168, "ca": 269, "h2o": 132, "fiber": 0, "ref": "https://sa.fontactiv.com/en/product/fontactiv-energy/" },
        "FontActiv Complete Protien 1.25kcal/mL": { "kcal": 250, "volume": 200, "carbs": 31, "fat": 6.4, "protein": 16, "na": 100, "k": 310, "mg": 52, "p": 196, "ca": 300, "h2o": 0, "fiber": 0, "ref": "https://sa.fontactiv.com/en/product/fontactiv-complete-protein/" }
        
    },
    "Diabetic Formula": {
        "Glucerna SR 0.93kcal/mL": { "kcal": 186, "volume": 200, "carbs": 17.3, "fat": 6.76, "protein": 9.3, "na": 178, "k": 312, "mg": 36, "p": 120, "ca": 128, "h2o": 170, "fiber": 1.52, "ref": "https://www.amazon.sa/-/en/Glucerna-Vanilla-Flavor-Diabetics-Milk/dp/B097SWWQX1" },
        "Glucerna 1kcal/mL": { "kcal": 200, "volume": 200, "carbs": 16.28, "fat": 10.8, "protein": 8.36, "na": 186, "k": 260, "mg": 40, "p": 130, "ca": 140, "h2o": 169.8, "fiber": 2.88, "ref": null },
        "FortiActive diaBest Shake 1kcal/mL (Vanilla)": { "kcal": 200, "volume": 200, "carbs": 19.3, "fat": 8.66, "protein": 9.2, "na": 166, "k": 199, "mg": 37.3, "p": 109, "ca": 153, "h2o": 156.8, "fiber": 4.06, "ref": null },
        "Glucerna Advanced 1.6kcal/mL": { "kcal": 355, "volume": 220, "carbs": 28.05, "fat": 18.22, "protein": 18.3, "na": 308, "k": 363, "mg": 57, "p": 194, "ca": 271, "h2o": 164.3, "fiber": 4.2, "ref": null },
        "Supportan 1.5kcal/mL (Cappuccino)": { "kcal": 300, "volume": 200, "carbs": 23.2, "fat": 13.4, "protein": 20, "na": 95, "k": 256, "mg": 54, "p": 240, "ca": 406, "h2o": 152, "fiber": 3, "ref": null },
        "Supportan 1.5kcal/mL (Choclate)": { "kcal": 300, "volume": 200, "carbs": 23, "fat": 13.4, "protein": 20, "na": 124, "k": 300, "mg": 34, "p": 240, "ca": 400, "h2o": 154, "fiber": 3.5, "ref": null },
        "Diasip 1kcal/mL (Nutricia)": { "kcal": 208, "volume": 200, "carbs": 23.4, "fat": 7.6, "protein": 9.8, "na": 110, "k": 200, "mg": 46, "p": 94, "ca": 106, "h2o": 166, "fiber": 4, "ref": null },
        "Surenutri Diabetic 1kcal/mL (Almarai)": { "kcal": 201, "volume": 200, "carbs": 19.3, "fat": 8.66, "protein": 9.2, "na": 166, "k": 199, "mg": 36.6, "p": 109, "ca": 145, "h2o": 0, "fiber": 4.06, "ref": null },
        "Resource Diabetic 1kcal/mL (Nestle)": { "kcal": 240, "volume": 237, "carbs": 23.2, "fat": 10.4, "protein": 10.7, "na": 230, "k": 228, "mg": 43, "p": 130, "ca": 187, "h2o": 0, "fiber": 4.5, "ref": "https://www.nestlehealthscience-me.com/en/brands/resource/resource-diabetic" },
        "Advanced Diason 1.03kcal/mL (Nutricia-close system)": { "kcal": 1000, "volume": 1000, "carbs": 113, "fat": 42, "protein": 43, "na": 1000, "k": 1500, "mg": 230, "p": 720, "ca": 800, "h2o": 840, "fiber": 15, "ref": "https://www.nutricia.co.za/upload/product%20pdfs/Nutrison%20Advanced%20Diason%201L%20Fact%20Sheet%20SA%20-%20FC.pdf" },
        "nutrision Advanced diason energy HP 1.5kcal/mL (Nutricia-close system)": { "kcal": 1500, "volume": 1000, "carbs": 117, "fat": 77, "protein": 77, "na": 1310, "k": 2000, "mg": 370, "p": 820, "ca": 820, "h2o": 770, "fiber": 15, "ref": "https://www.nutricia.co.za/upload/product%20pdfs/Nutrison%20Advanced%20Diason%20Energy%20%20HP%201L%20Fact%20Sheet%20SA%20-%20FC.pdf" },
        "Diben 1.5kcal/mL (Fresenius kabi) Vanilla, Praline": { "kcal": 300, "volume": 200, "carbs": 26.2, "fat": 14, "protein": 15, "na": 130, "k": 260, "mg": 30, "p": 190, "ca": 300, "h2o": 158, "fiber": 4, "ref": null },
        "Diben 1.5kcal/mL (Fresenius kabi) Forest Berries": { "kcal": 300, "volume": 200, "carbs": 26.2, "fat": 14, "protein": 15, "na": 140, "k": 260, "mg": 30, "p": 190, "ca": 300, "h2o": 158, "fiber": 4, "ref": null },
        "Diben 1.5kcal/mL (Fresenius kabi) Cappuccino": { "kcal": 300, "volume": 200, "carbs": 26.2, "fat": 14, "protein": 15, "na": 140, "k": 260, "mg": 30, "p": 190, "ca": 300, "h2o": 158, "fiber": 4, "ref": null },
        "Diabetesource AC 1.2kcal/mL (Nestle-close system)": { "kcal": 1200, "volume": 1000, "carbs": 100, "fat": 58.8, "protein": 60, "na": 1060, "k": 1600, "mg": 320, "p": 800, "ca": 800, "h2o": 818, "fiber": 15.2, "ref": "https://www.nestlehealthscience-me.com/en/brands/diabetisource-ac/diabetisourec-ac-spikeright" }
    },
    "Renal Formula": {
        "HD Max 1.5kcal/mL": { "kcal": 300, "volume": 200, "carbs": 40, "fat": 9.2, "protein": 13.4, "na": 230, "k": 120, "mg": 24, "p": 160, "ca": 162, "h2o": 0, "fiber": 4, "ref": "https://drive.google.com/file/d/1IXTBIL5npJ8xBR_qBAlW88g4joyvScHT/view" },
        "Nepro LP 1.8kcal/mL (Abbott)": { "kcal": 401, "volume": 220, "carbs": 40.77, "fat": 21.34, "protein": 9.94, "na": 176, "k": 251, "mg": 46, "p": 143, "ca": 161, "h2o": 162, "fiber": 2.77, "ref": "https://www.eboshealthcare.com.au/globalassets/ebos-au/product-images-au/a/ab2288271-information-sheet.pdf" },
        "Nepro HP 1.8kcal/mL (Abbott)": { "kcal": 401, "volume": 220, "carbs": 32.34, "fat": 21.56, "protein": 17.82, "na": 154, "k": 233.2, "mg": 46.2, "p": 158.4, "ca": 233.2, "h2o": 161, "fiber": 2.77, "ref": "https://www.family.abbott/au-en/products/nepro/nepro-hp-strawberry.html" },
        "Novasource Renal 2kcal/mL (Nestle)": { "kcal": 402, "volume": 200, "carbs": 37, "fat": 20, "protein": 18.2, "na": 152, "k": 162, "mg": 40, "p": 122, "ca": 176, "h2o": 142, "fiber": 0, "ref": "https://www.ncare.net.au/novasourcearenal-1" },
        "Nutrition concentrated 2kcal/mL (Nutricia-close system)": { "kcal": 1000, "volume": 500, "carbs": 100.5, "fat": 50, "protein": 37.5, "na": 500, "k": 900, "mg": 175, "p": 380, "ca": 400, "h2o": 350, "fiber": 0, "ref": "https://nutricia.com.au/adult/wp-content/uploads/sites/7/2020/08/Nutrison_Concentrated_Factsheet_AUS_OpTri_June_2020.pdf" }
    },
    "Hepatic Formula": {
        "Nutrihep 1.5kcal/mL (Nestle)": { "kcal": 375, "volume": 250, "carbs": 72.5, "fat": 21.2, "protein": 10, "na": 40, "k": 330, "mg": 94, "p": 250, "ca": 239, "h2o": 190, "fiber": 0, "ref": "https://www.nestlehealthscience-me.com/en/brands/nutrihep/nutrihep" },
        "Fresubin Heap Drink 1.3kcal/mL (Fresenius Kabi)": { "kcal": 260, "volume": 200, "carbs": 34.8, "fat": 9.4, "protein": 8, "na": 150, "k": 240, "mg": 54, "p": 106, "ca": 160, "h2o": 156, "fiber": 2, "ref": "https://www.fresubin.com/sites/default/files/2020-02/Productsheet_Fresubin_HepaDrink_2019.pdf" }
    },
    "Semielemental & Elemental Formula": {
        "Peptamen 1.5 (Nestle) Unflavored": { "kcal": 375, "volume": 250, "carbs": 47, "fat": 14, "protein": 17, "na": 220, "k": 520, "mg": 105, "p": 250, "ca": 250, "h2o": 192, "fiber": 0, "ref": "https://www.nestlemedicalhub.com/products/peptamen-15" },
        "Peptamen Vanilla 1.5kcal/mL (Nestle)": { "kcal": 375, "volume": 250, "carbs": 47, "fat": 14, "protein": 17, "na": 220, "k": 520, "mg": 105, "p": 250, "ca": 250, "h2o": 193, "fiber": 0, "ref": "https://www.nestlemedicalhub.com/products/peptamen-15" },
        "Peptamen AF 1.5kcal/mL (Nestle)": { "kcal": 380, "volume": 250, "carbs": 35, "fat": 16, "protein": 24, "na": 325, "k": 675, "mg": 75, "p": 150, "ca": 250, "h2o": 195, "fiber": 0, "ref": "https://www.nestlehealthscience.my/brands/peptamen/peptamen-af" },
        "Peptamen Intense VHP 1kcal/mL (Nestle)": { "kcal": 250, "volume": 250, "carbs": 19, "fat": 9.5, "protein": 23, "na": 170, "k": 375, "mg": 75, "p": 170, "ca": 170, "h2o": 210, "fiber": 1, "ref": "https://www.peptamen.com/product/peptamen-intense-vhp" },
        "Peptamen AF 1.2kcal/mL (Nestle)": { "kcal": 300, "volume": 250, "carbs": 28, "fat": 13.5, "protein": 19, "na": 180, "k": 450, "mg": 85, "p": 200, "ca": 200, "h2o": 203, "fiber": 1.5, "ref": "https://www.nestlemedicalhub.com/products/peptamen-af" },
        "Vital 1.5kcal/mL (Abbott)": { "kcal": 300, "volume": 200, "carbs": 36.8, "fat": 11, "protein": 13.5, "na": 338, "k": 400, "mg": 60, "p": 200, "ca": 200, "h2o": 155, "fiber": 0, "ref": "https://www.abbottnutrition.com/vital-1_5-cal" },
        "Peptamins 1.5kcal/mL (Sierra)": { "kcal": 300, "volume": 200, "carbs": 16, "fat": 0, "protein": 5.3, "na": 119, "k": 250, "mg": 0, "p": 80, "ca": 0, "h2o": 0, "fiber": 0.8, "ref": null },
        "Pivot 1.5kcal/mL (Abbott)": { "kcal": 355, "volume": 237, "carbs": 41, "fat": 12, "protein": 22, "na": 350, "k": 470, "mg": 100, "p": 230, "ca": 240, "h2o": 178, "fiber": 1.8, "ref": "https://nutrition.abbott/ca/en/adult/pivot-1_5-cal" }
    }
}`;


const pediatricFormulaDataJSON = `{
    "Standard (Liquid)": {
"PediaSure (Choclate/Vanilla)": { "kcal": 200, "volume": 200, "carbs": 22.32, "fat": 9.96, "protein": 5.6, "na": 120, "k": 220, "mg": 32, "p": 106, "ca": 112, "h2o": 170.8, "fiber": 0, "ref": null },
"SureGrow Junior (Vanilla)": { "kcal": 200, "volume": 200, "carbs": 21.5, "fat": 9.9, "protein": 6.2, "na": 110, "k": 218, "mg": 32, "p": 146, "ca": 170, "h2o": 0, "fiber": 0, "ref": null }
    },
    "High Calorie Formula (Liquid)": {
"Tdiet Junior (Choclate/Vanilla)": { "kcal": 300, "volume": 200, "carbs": 36.6, "fat": 14, "protein": 7, "na": 116, "k": 240, "mg": 42, "p": 120, "ca": 136, "h2o": 0, "fiber": 0, "ref": null },
"SureGrow Junior with Fiber (Vanilla)": { "kcal": 300, "volume": 200, "carbs": 35.1, "fat": 13, "protein": 9, "na": 189, "k": 381, "mg": 36.3, "p": 153, "ca": 248, "h2o": 0, "fiber": 3.31, "ref": null },
"Resource Junior (Vanilla)": { "kcal": 304, "volume": 200, "carbs": 42, "fat": 12.4, "protein": 6, "na": 150, "k": 400, "mg": 38, "p": 150, "ca": 250, "h2o": 156, "fiber": 0, "ref": "https://www.nestlehealthscience.co.uk/sites/default/files/2020-12/Resource_Junior_Data_Card_Nov_20.pdf" },
"Resource Junior (Choclate)": { "kcal": 306, "volume": 200, "carbs": 42, "fat": 12.4, "protein": 6, "na": 150, "k": 400, "mg": 38, "p": 150, "ca": 250, "h2o": 156, "fiber": 0, "ref": "https://iapteka1.pl/en/nestle-resource-junior-liquid-nutritional-supplement-for-children-chocolate-flavour-800-ml-4-x-200-ml" },
"Resource Junior (Strawberry)": { "kcal": 304, "volume": 200, "carbs": 42, "fat": 12.4, "protein": 6, "na": 150, "k": 400, "mg": 38, "p": 150, "ca": 250, "h2o": 156, "fiber": 0, "ref": "https://www.nestlehealthscience.co.uk/sites/default/files/2020-12/Resource_Junior_Data_Card_Nov_20.pdf" }
    }
}`;

const modularProductsJSON = `[
    {"moduler":"Nutrisource fiber","servingUnit":"Packet","volume":"4 g","kcal":"15","h2oMl":"","choG":"3","proG":"","fatG":"","naMg":"","kMg":"","caMg":"","mgMg":"","po4Mg":"","fiberG":"3","glutamineG":"","lArginineG":"","mctG":"","osmolarity":"","prescription":"1 packet = 4g =  dissolve in 120 mL of water"},
    {"moduler":"Banatrol","servingUnit":"Packet","volume":"10.75 g ","kcal":"40","h2oMl":"","choG":"10","proG":"","fatG":"","naMg":"15","kMg":"125","caMg":"","mgMg":"","po4Mg":"9","fiberG":"2","glutamineG":"","lArginineG":"","mctG":"","osmolarity":"","prescription":"1 Packet = 10.75g = dissolve in 120 mL"},
    {"moduler":"Hyfiber","servingUnit":"Sachet","volume":"30 ml","kcal":"20","h2oMl":"","choG":"14","proG":"","fatG":"","naMg":"1","kMg":"","caMg":"","mgMg":"","po4Mg":"","fiberG":"12","glutamineG":"","lArginineG":"","mctG":"","osmolarity":"","prescription":""},
    {"moduler":"MCT Oil (Nestle)","servingUnit":"mL","volume":"1 ml ","kcal":"7.7","h2oMl":"","choG":"","proG":"","fatG":"1","naMg":"","kMg":"","caMg":"","mgMg":"","po4Mg":"","fiberG":"","glutamineG":"","lArginineG":"","mctG":"","osmolarity":"","prescription":""},
    {"moduler":"Beneprotein","servingUnit":"Scoop","volume":"7 g","kcal":"25","h2oMl":"","choG":"","proG":"6","fatG":"","naMg":"15","kMg":"","caMg":"","mgMg":"","po4Mg":"","fiberG":"","glutamineG":"","lArginineG":"","mctG":"","osmolarity":"","prescription":"1 Scoop =7g = dissolve in 60 mL"},
    {"moduler":"Fresubin protein","servingUnit":"Scoop","volume":"5 g","kcal":"18","h2oMl":"","choG":"","proG":"4.4","fatG":"0.05","naMg":"27.5","kMg":"60","caMg":"3","mgMg":"","po4Mg":"12","fiberG":"","glutamineG":"","lArginineG":"","mctG":"","osmolarity":"","prescription":"1 Scoop =5g = dissolve in 12.5 mL"},
    {"moduler":"Kabi Glutamine","servingUnit":"Sachet","volume":"20 g","kcal":"74","h2oMl":"","choG":"8","proG":"","fatG":"","naMg":"","kMg":"","caMg":"","mgMg":"1.2","po4Mg":"","fiberG":"","glutamineG":"10","lArginineG":"","mctG":"","osmolarity":"235","prescription":""},
    {"moduler":"ArgiMent AT","servingUnit":"Sachet","volume":"42.75 g","kcal":"120","h2oMl":"","choG":"6","proG":"10","fatG":"","naMg":"40","kMg":"87","caMg":"","mgMg":"","po4Mg":"35","fiberG":"","glutamineG":"7","lArginineG":"7","mctG":"","osmolarity":"380","prescription":""},
    {"moduler":"Fantomalt (Gluten free, lactose free)","servingUnit":"Scoop","volume":"5 g","kcal":"19.2","h2oMl":"-­‐","choG":"4.8","proG":"-­‐","fatG":"-­‐","naMg":"0.1","kMg":"","caMg":"","mgMg":"","po4Mg":"","fiberG":"0.324","glutamineG":"","lArginineG":"","mctG":"","osmolarity":"","prescription":""},
    {"moduler":"Thicken up","servingUnit":"Scoop","volume":"1.2 g","kcal":"3.672","h2oMl":"-­‐","choG":"0.744","proG":"0.012","fatG":"0","naMg":"12.72","kMg":"4.8","caMg":"","mgMg":"","po4Mg":"","fiberG":"0.324","glutamineG":"","lArginineG":"","mctG":"","osmolarity":"","prescription":""},
    {"moduler":"MCTprocal","servingUnit":"Sachet","volume":"16 g","kcal":"112","h2oMl":"","choG":"3.3","proG":"2","fatG":"10","naMg":"35","kMg":"98","caMg":"58","mgMg":"","po4Mg":"80","fiberG":"","glutamineG":"","lArginineG":"","mctG":"10","osmolarity":"","prescription":"1 scahet = 16g = dissolve in 50 mL"}
]`;

function buildModularData(productsJSON) {
    const products = JSON.parse(productsJSON);
    const data = {};
    
    const nutrientMap = {
        "kcal": "kcal", "choG": "choG", "proG": "proG", "fatG": "fatG",
        "naMg": "naMg", "kMg": "kMg", "caMg": "caMg", "mgMg": "mgMg", "po4Mg": "po4Mg",
        "fiberG": "fiberG", "glutamineG": "glutamineG", "lArginineG": "lArginineG", "mctG": "mctG",
        "osmolarity": "osmolarity"
    };
    
    const mainNutrientKeyMap = {
        "Nutrisource fiber": "fiberG", "Banatrol": "fiberG", "Hyfiber": "fiberG",
        "MCT Oil (Nestle)": "kcal", "Beneprotein": "proG", "Fresubin protein": "proG",
        "Kabi Glutamine": "glutamineG", "ArgiMent AT": "lArginineG",
        "Fantomalt (Gluten free, lactose free)": "kcal", "Thicken up": null, "MCTprocal": "mctG"
    };
    const mainNutrientDisplayMap = {
        "kcal": "kcal", "choG": "g carbs", "proG": "g protein", "fatG": "g fat",
        "fiberG": "g fiber", "glutamineG": "g glutamine", "lArginineG": "g l-arginine", "mctG": "g mct"
    };

    products.forEach(product => {
        try {
            const name = product.moduler;
            if (!name) return;
            
            const volumeString = (product.volume || "").trim().toLowerCase();
            const [baseAmountStr, baseUnitName] = volumeString.split(' ');
            
            if (!baseUnitName) {
                 console.error(`Could not parse base unit for ${name}`);
                 return;
            }

            const baseAmount = parseFloat(baseAmountStr) || 1;
            const baseContent = {};

            Object.keys(product).forEach(key => {
                if (typeof product[key] === 'string' && product[key].includes('­')) {
                    product[key] = "0";
                }
            });

            const targetOptions = {}; 
            
            for (const key in nutrientMap) {
                const nutrientName = nutrientMap[key];
                const value = parseFloat(product[key]) || 0;
                baseContent[nutrientName] = value / baseAmount;
            }

            if (product.servingUnit && product.servingUnit.trim() !== "" && product.servingUnit.trim().toLowerCase() !== baseUnitName) {
                let servingUnit = product.servingUnit.toLowerCase().trim();
                
                if (name === "Hyfiber" && product.servingUnit.toLowerCase() === 'sachet') {
                    servingUnit = 'Sachets';
                } else if (servingUnit !== "ml") {
                    servingUnit = servingUnit.endsWith('s') ? servingUnit : servingUnit + 's';
                }
                
                targetOptions[servingUnit] = { nutrient: baseUnitName, perBaseUnit: baseAmount };
            }

            const mainNutrientRawKey = mainNutrientKeyMap[name];
            if (mainNutrientRawKey) {
                const nutrientName = nutrientMap[mainNutrientRawKey];
                const displayUnit = mainNutrientDisplayMap[mainNutrientRawKey];
                if (displayUnit && baseContent[nutrientName] > 0) {
                    targetOptions[displayUnit] = { nutrient: nutrientName, perBaseUnit: baseContent[nutrientName] };
                }
            }

            if (Object.keys(targetOptions).length === 1 && !targetOptions[baseUnitName]) {
                targetOptions[baseUnitName] = { nutrient: baseUnitName, perBaseUnit: 1 };
            }
            
            if (name === "Hyfiber" || name === "MCT Oil (Nestle)") {
                 if (baseUnitName === 'ml' && !targetOptions[baseUnitName]) { 
                    targetOptions[baseUnitName] = { nutrient: baseUnitName, perBaseUnit: 1 };
                 }
            }

            let water = 0;
            if (product.prescription) {
                const match = product.prescription.match(/dissolve in (\d+(\.\d+)?)\s*mL/i);
                if (match && match[1]) {
                    water = parseFloat(match[1]) / baseAmount;
                }
            }
            baseContent["water"] = water;
            baseContent["h2oMl"] = parseFloat(product.h2oMl || 0) / baseAmount;

            data[name] = {
                baseUnit: { name: baseUnitName, content: baseContent },
                targetOptions: targetOptions
            };
        } catch (e) {
            console.error("Failed to parse modular product:", product.moduler, e);
        }
    });
    return data;
}


// --- 2. STATE MANAGEMENT ---

let selectedFormulas = []; 
let modularRows = 0;        
let chartInstances = {};    


// --- 3. INITIALIZATION SEQUENCE (SELF-HEALING) ---

/**
 * CRITICAL FIX FOR SOFTR SPA:
 * Uses setInterval to continuously check if the calculator DOM exists but hasn't been initialized.
 * This handles page navigation (going back and forth) without needing a refresh.
 */
const checkAndInit = () => {
    const wrapper = document.getElementById('calculator-wrapper');
    
    // 1. Does the wrapper exist in the DOM? (Softr rendered the block)
    if (wrapper) {
        // 2. Have we already initialized this specific instance?
        if (!wrapper.dataset.initialized) {
            console.log("Calculator wrapper found. Initializing...");
            initializeApp();
            wrapper.dataset.initialized = "true"; // Mark as done to prevent loop
        }
    }
};

// Check every 200ms. This is lightweight and ensures instant loading on navigation.
setInterval(checkAndInit, 200);


/**
 * Main Init: Parses data, populates initial UI, and binds events.
 */
function initializeApp() {
    try {
        adultFormulaData = JSON.parse(adultFormulaDataJSON);
        pediatricFormulaData = JSON.parse(pediatricFormulaDataJSON);
        modularData = buildModularData(modularProductsJSON);
    } catch (e) {
        console.error("Failed to parse application data:", e);
        document.body.innerHTML = `<div class="p-4 bg-red-100 text-red-800 rounded-lg"><strong>Error:</strong> Failed to load calculator data. ${e.message}</div>`;
        return;
    }

    const elements = getElements();
    
    // Initial load of adult formulas
    updateFormulaList('Adult');
    
    populateModularSelect(elements.modularSelect);
    
    // -- Bind Events --
    document.getElementById('addFormulaBtn').addEventListener('click', addFormulaPill);
    document.getElementById('addModularBtn').addEventListener('click', addModularItemCard);
    document.getElementById('calculateBtn').addEventListener('click', performCalculations);
    document.getElementById('resetBtn').addEventListener('click', resetCalculator);

    // Patient Type Toggle Events
    document.getElementById('adultBtn').addEventListener('click', () => {
        if (currentFormulaMode !== 'Adult') {
            updateFormulaList('Adult');
            resetFormulaSelection();
        }
    });
    document.getElementById('pediatricBtn').addEventListener('click', () => {
        if (currentFormulaMode !== 'Pediatric') {
            updateFormulaList('Pediatric');
            resetFormulaSelection();
        }
    });

    elements.formulaInput.addEventListener('focus', () => filterFormulaDropdown(elements, elements.formulaInput.value));
    elements.formulaInput.addEventListener('input', () => filterFormulaDropdown(elements, elements.formulaInput.value));
    elements.formulaInput.addEventListener('blur', () => {
        setTimeout(() => elements.formulaDropdown.classList.add('hidden'), 200);
    });
    elements.formulaDropdown.addEventListener('mousedown', (e) => {
        const target = e.target.closest('[data-value]');
        if (target && target.dataset.value) {
            elements.formulaInput.value = target.dataset.value;
            elements.formulaDropdown.classList.add('hidden');
        }
    });

    elements.feedingGoalSlider.addEventListener('input', (e) => {
        elements.feedingGoalValue.textContent = `${e.target.value}%`;
    });

    const toggleAccordion = (btnId, containerId, chevronId) => {
        document.getElementById(btnId).addEventListener('click', () => {
            document.getElementById(containerId).classList.toggle('hidden');
            document.getElementById(chevronId).classList.toggle('rotate-180');
        });
    };
    toggleAccordion('propofolHeaderBtnInput', 'propofolContainerWrapper', 'propofolChevronInput');
    toggleAccordion('modularHeaderBtnInput', 'modularContainerWrapper', 'modularChevronInput');
    toggleAccordion('propofolHeaderBtn', 'propofolBreakdownContainer', 'propofolChevron');
    toggleAccordion('modularHeaderBtn', 'modularBreakdownContainer', 'modularChevron');

    elements.formulaPillsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-pill')) {
            const formulaName = e.target.parentElement.dataset.formula;
            removeFormulaPill(formulaName, e.target.parentElement);
        }
    });
    
    elements.modularContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-modular-item')) {
            const cardElement = e.target.closest('.modular-item-card');
            if (cardElement) cardElement.remove();
        }
    });

    // Clear UI to pristine state
    initializeResultsUI();
}


// --- 4. DOM & UTILITY FUNCTIONS ---

function getElements() {
    return {
        formulaInput: document.getElementById('formulaInput'),
        formulaDropdown: document.getElementById('formulaDropdown'),
        formulaSelectContainer: document.getElementById('formulaSelectContainer'),
        formulaPillsContainer: document.getElementById('formulaPillsContainer'),
        
        modularSelect: document.getElementById('modularSelect'),
        modularSelectContainer: document.getElementById('modularSelectContainer'),
        modularContainer: document.getElementById('modularContainer'),
        modularContainerWrapper: document.getElementById('modularContainerWrapper'),
        modularChevronInput: document.getElementById('modularChevronInput'),
        
        energyNeeds: document.getElementById('energyNeeds'),
        proteinNeeds: document.getElementById('proteinNeeds'),
        fluidNeeds: document.getElementById('fluidNeeds'),
        
        feedingGoalSlider: document.getElementById('feedingGoalSlider'),
        feedingGoalValue: document.getElementById('feedingGoalValue'),
        feedingPeriod: document.getElementById('feedingPeriod'),
        
        propofolVolume: document.getElementById('propofolVolume'),
        propofolDuration: document.getElementById('propofolDuration'),
        propofolContainerWrapper: document.getElementById('propofolContainerWrapper'),
        propofolChevronInput: document.getElementById('propofolChevronInput'),
        
        primaryBreakdownContainer: document.getElementById('primaryBreakdownContainer'),
        propofolHeaderBtn: document.getElementById('propofolHeaderBtn'),
        propofolBreakdownContainer: document.getElementById('propofolBreakdownContainer'),
        propofolChevron: document.getElementById('propofolChevron'),
        modularHeaderBtn: document.getElementById('modularHeaderBtn'),
        modularBreakdownContainer: document.getElementById('modularBreakdownContainer'),
        modularChevron: document.getElementById('modularChevron')
    };
}

function updateFormulaList(mode) {
    currentFormulaMode = mode;
    allFormulaNames = [];
    
    const dataSource = mode === 'Adult' ? adultFormulaData : pediatricFormulaData;
    
    for (const category in dataSource) {
        for (const formulaName in dataSource[category]) {
            allFormulaNames.push({ name: formulaName, category: category });
        }
    }

    // Update UI Button Styles
    const adultBtn = document.getElementById('adultBtn');
    const pediatricBtn = document.getElementById('pediatricBtn');
    
    if (mode === 'Adult') {
        adultBtn.classList.add('bg-white', 'text-gray-800', 'shadow-sm');
        adultBtn.classList.remove('text-gray-500');
        pediatricBtn.classList.remove('bg-white', 'text-gray-800', 'shadow-sm');
        pediatricBtn.classList.add('text-gray-500');
    } else {
        pediatricBtn.classList.add('bg-white', 'text-gray-800', 'shadow-sm');
        pediatricBtn.classList.remove('text-gray-500');
        adultBtn.classList.remove('bg-white', 'text-gray-800', 'shadow-sm');
        adultBtn.classList.add('text-gray-500');
    }
}

function resetFormulaSelection() {
    selectedFormulas = [];
    document.getElementById('formulaPillsContainer').innerHTML = '';
    document.getElementById('formulaInput').value = '';
}

function findFormulaData(formulaName) {
    // Check current mode first
    let dataSource = currentFormulaMode === 'Adult' ? adultFormulaData : pediatricFormulaData;
    for (const category in dataSource) {
        if (dataSource[category][formulaName]) {
            return dataSource[category][formulaName];
        }
    }
    // Fallback check (in case data persists across mode switch)
    dataSource = currentFormulaMode === 'Adult' ? pediatricFormulaData : adultFormulaData;
    for (const category in dataSource) {
        if (dataSource[category][formulaName]) {
            return dataSource[category][formulaName];
        }
    }
    return null;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function formatNum(num, places = 2) {
    if (num === null || num === undefined) return '0.00';
    const numStr = num.toString();
    const decimalPointIndex = numStr.indexOf('.');
    
    if (decimalPointIndex === -1) {
        return `${numStr}.${'0'.repeat(places)}`;
    }
    
    const [integerPart, decimalPart = ''] = numStr.split('.');
    const paddedDecimalPart = (decimalPart || '').padEnd(places, '0');
    return `${integerPart}.${paddedDecimalPart.substring(0, places)}`;
}

function capitalizeUnit(unitString) {
    if (unitString.length === 0) return unitString;
    const lowerUnit = unitString.toLowerCase();
    if (lowerUnit === 'ml') return 'mL';
    if (['scoops', 'packets', 'sachets'].includes(lowerUnit)) {
        return unitString.charAt(0).toUpperCase() + unitString.slice(1);
    }
    if (unitString.includes(' ') || lowerUnit === 'g') {
        return unitString;
    }
    return unitString.charAt(0).toUpperCase() + unitString.slice(1);
}


// --- 5. UI GENERATORS & INTERACTION HANDLERS ---

function filterFormulaDropdown(elements, searchTerm) {
    const { formulaDropdown } = elements;
    formulaDropdown.innerHTML = '';
    const lowerSearchTerm = searchTerm.toLowerCase().trim();

    const filtered = allFormulaNames.filter(f => 
        f.name.toLowerCase().includes(lowerSearchTerm)
    );

    if (filtered.length === 0) {
        formulaDropdown.innerHTML = '<div class="p-2 text-gray-500 text-sm">No formula found.</div>';
        formulaDropdown.classList.remove('hidden');
        return;
    }
    
    let currentCategory = '';
    const highlightRegex = lowerSearchTerm ? new RegExp(`(${escapeRegExp(lowerSearchTerm)})`, 'ig') : null;

    filtered.forEach(f => {
        if (f.category !== currentCategory) {
            formulaDropdown.innerHTML += `<div class="p-2 text-xs font-bold text-gray-500 bg-gray-50 sticky top-0">${f.category}</div>`;
            currentCategory = f.category;
        }
        
        const highlightedName = highlightRegex 
            ? f.name.replace(highlightRegex, `<strong class="text-blue-600 font-bold">$1</strong>`)
            : f.name;

        formulaDropdown.innerHTML += 
            `<div class="p-2 text-sm text-gray-700 hover:bg-blue-100 cursor-pointer" data-value="${f.name}">
                ${highlightedName}
             </div>`;
    });
    
    formulaDropdown.classList.remove('hidden');
}

function addFormulaPill() {
    const elements = getElements();
    const formulaName = elements.formulaInput.value;

    if (!formulaName || !findFormulaData(formulaName)) {
        elements.formulaInput.parentElement.classList.add('shake');
        elements.formulaInput.classList.add('border-red-500');
        setTimeout(() => {
            elements.formulaInput.parentElement.classList.remove('shake');
            elements.formulaInput.classList.remove('border-red-500');
        }, 600);
        return;
    }

    if (!selectedFormulas.includes(formulaName)) {
        selectedFormulas.push(formulaName);
        const pill = document.createElement('div');
        pill.className = 'flex items-center justify-between bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full max-w-xs';
        pill.dataset.formula = formulaName;
        
        pill.innerHTML = `
            <span class="truncate" title="${formulaName}">${formulaName}</span>
            <button class="remove-pill ml-2 text-blue-600 hover:text-blue-800 font-bold">&times;</button>
        `;
         elements.formulaPillsContainer.appendChild(pill);
    }
    elements.formulaInput.value = ''; 
}

function removeFormulaPill(formulaName, pillElement) {
    selectedFormulas = selectedFormulas.filter(f => f !== formulaName);
    if (pillElement) pillElement.remove();
}

function populateModularSelect(select) {
    if (!modularData) return;
    select.innerHTML = '<option value="">-- Select a modular --</option>';
    for (const modularName in modularData) {
        const option = document.createElement('option');
        option.value = modularName;
        option.textContent = modularName;
        select.appendChild(option);
    }
}

function addModularItemCard() {
    const elements = getElements();
    const modularName = elements.modularSelect.value;
    const container = elements.modularContainer;

    if (!modularName) {
        elements.modularSelectContainer.classList.add('shake', 'border', 'border-red-500', 'rounded-lg');
        setTimeout(() => {
            elements.modularSelectContainer.classList.remove('shake', 'border', 'border-red-500', 'rounded-lg');
        }, 600);
        return;
    }

    const data = modularData[modularName];
    modularRows++;
    const cardId = `modular-item-${modularRows}`;
    
    let unitOptionsHTML = '';
    for (const unit in data.targetOptions) {
        unitOptionsHTML += `<option value="${unit}">${unit}</option>`;
    }

    const card = document.createElement('div');
    card.id = cardId;
    card.dataset.modularName = modularName; 
    card.className = 'modular-item-card bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm';
    card.innerHTML = `
        <div class="flex justify-between items-center mb-2">
            <strong class="text-sm font-medium text-gray-800">${modularName}</strong>
            <button class="remove-modular-item text-red-500 hover:text-red-700 font-bold text-lg leading-none">&times;</button>
        </div>
        <div class="grid grid-cols-12 gap-2 items-center">
            <div class="col-span-5">
                 <label class="block text-xs text-gray-600 mb-0.5">Amount</label>
                <input type="number" class="modular-amount w-full p-2 border border-gray-300 rounded-lg shadow-sm text-sm" placeholder="0">
            </div>
            <div class="col-span-7">
                 <label class="block text-xs text-gray-600 mb-0.5">Unit</label>
                <select class="modular-unit w-full p-2 border border-gray-300 rounded-lg shadow-sm text-sm">
                    ${unitOptionsHTML}
                </select>
            </div>
        </div>
    `;
    container.appendChild(card);
    elements.modularSelect.value = ''; 
}

function resetCalculator() {
    const elements = getElements();
    
    elements.energyNeeds.value = '';
    elements.proteinNeeds.value = '';
    elements.fluidNeeds.value = '';
    elements.feedingGoalSlider.value = 100;
    elements.feedingGoalValue.textContent = '100%';
    elements.feedingPeriod.value = "24";
    elements.propofolVolume.value = '';
    elements.propofolDuration.value = '';
    elements.formulaInput.value = '';
    elements.modularSelect.value = '';
    
    // Reset to Adult mode by default on full reset, or keep current? Let's reset to Adult
    updateFormulaList('Adult');
    resetFormulaSelection();

    modularRows = 0;
    elements.modularContainer.innerHTML = '';

    initializeResultsUI();

    elements.propofolContainerWrapper.classList.add('hidden');
    elements.propofolChevronInput.classList.remove('rotate-180');
    elements.modularContainerWrapper.classList.add('hidden');
    elements.modularChevronInput.classList.remove('rotate-180');
}


// --- 6. CORE CALCULATION ENGINE ---

function performCalculations() {
    if (!adultFormulaData || !modularData) return;

    const elements = getElements();

    // --- Step 1: Validation ---
    const hasPrimary = selectedFormulas.length > 0;
    const hasModular = elements.modularContainer.querySelectorAll('.modular-item-card').length > 0;

    if (!hasPrimary && !hasModular) {
        const calcBtn = document.getElementById('calculateBtn');
        
        calcBtn.classList.add('shake');
        
        const originalText = calcBtn.textContent; 
        calcBtn.textContent = "Please add a formula";
        calcBtn.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
        calcBtn.classList.add('bg-red-600', 'hover:bg-red-700');

        setTimeout(() => {
            calcBtn.classList.remove('shake');
            calcBtn.classList.remove('bg-red-600', 'hover:bg-red-700');
            calcBtn.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
            calcBtn.textContent = originalText;
        }, 1500);

        return;
    }

    // --- Step 2: Gather Needs ---
    const needs = {
        energy: parseFloat(elements.energyNeeds.value) || 0,
        protein: parseFloat(elements.proteinNeeds.value) || 0,
        fluid: parseFloat(elements.fluidNeeds.value) || 0
    };
    const feedingGoal = (parseFloat(elements.feedingGoalSlider.value) || 100) / 100; 
    const feedingPeriod = parseFloat(elements.feedingPeriod.value) || 24;
    const targetCalories = needs.energy * feedingGoal;

    // --- Step 3: Propofol ---
    const propofolVolume = parseFloat(elements.propofolVolume.value) || 0;
    const propofolDuration = parseFloat(elements.propofolDuration.value) || 0;
    const propofolKcal = propofolVolume * propofolDuration * 1.1; 
    const propofolResults = {
        kcal: propofolKcal,
        volume: propofolVolume * propofolDuration,
    };

    // --- Step 4: Modulars ---
    const modularCards = elements.modularContainer.querySelectorAll('.modular-item-card');
    let modularResultsArray = [];
    
    modularCards.forEach(card => {
        const modularName = card.dataset.modularName; 
        const amount = parseFloat(card.querySelector('.modular-amount').value) || 0;
        const unit = card.querySelector('.modular-unit').value; 

        if (!modularName || amount === 0 || !unit) return;

        const data = modularData[modularName];
        const targetOption = data.targetOptions[unit];
        const baseContent = data.baseUnit.content;
        const baseUnitName = data.baseUnit.name;
        
        let unitsNeeded = 0; 
        let displayAmount = amount; 
        let displayUnit = unit;     

        if (unit === baseUnitName) {
            unitsNeeded = amount;
            displayUnit = Object.keys(data.targetOptions).find(k => k !== baseUnitName) || baseUnitName;
            if(data.targetOptions[displayUnit] && data.targetOptions[displayUnit].perBaseUnit > 0) {
                 displayAmount = unitsNeeded / data.targetOptions[displayUnit].perBaseUnit;
            } else {
                 displayAmount = unitsNeeded;
            }
        } else if (targetOption.nutrient === baseUnitName) {
            unitsNeeded = amount * targetOption.perBaseUnit;
        } else {
            unitsNeeded = (targetOption.perBaseUnit > 0) ? (amount / targetOption.perBaseUnit) : 0;
            displayUnit = Object.keys(data.targetOptions).find(k => k !== unit && k !== baseUnitName) || baseUnitName;
            if(data.targetOptions[displayUnit] && data.targetOptions[displayUnit].perBaseUnit > 0) {
                 displayAmount = unitsNeeded / data.targetOptions[displayUnit].perBaseUnit;
            } else {
                displayAmount = unitsNeeded; 
                displayUnit = baseUnitName;
            }
        }
        
        const result = { 
            name: modularName, 
            units: unitsNeeded, 
            unitName: data.baseUnit.name,
            displayAmount: displayAmount, 
            displayUnit: displayUnit 
        };
        for (const key in baseContent) {
            result[key] = (baseContent[key] || 0) * unitsNeeded;
        }
        modularResultsArray.push(result);
    });

    const modularTotals = modularResultsArray.reduce((acc, mod) => {
        for (const key in mod) {
            if (!['name', 'units', 'unitName', 'displayAmount', 'displayUnit'].includes(key)) {
                acc[key] = (acc[key] || 0) + (mod[key] || 0);
            }
        }
        return acc;
    }, {});

    // --- Step 5: Primary Formulas ---
    let allPrimaryResults = [];
    selectedFormulas.forEach(formulaName => {
        const formulaData = findFormulaData(formulaName);
        if (!formulaData) return;

        const kcalMl = (formulaData.volume > 0) ? (formulaData.kcal / formulaData.volume) : 0;
        const primaryFormulaVolume = (kcalMl > 0) ? (targetCalories / kcalMl) : 0;
        const cans = (formulaData.volume > 0) ? (primaryFormulaVolume / formulaData.volume) : 0;
        
        let rateDivisor = feedingPeriod;
        if ([8, 6, 4, 3].includes(feedingPeriod)) {
            if (feedingPeriod === 8) rateDivisor = 3;
            else if (feedingPeriod === 6) rateDivisor = 4;
            else if (feedingPeriod === 4) rateDivisor = 6;
            else if (feedingPeriod === 3) rateDivisor = 8;
        }

        const breakdown = {
            name: formulaName,
            volume: primaryFormulaVolume,
            cans: cans,
            rate: primaryFormulaVolume / rateDivisor,
            kcal_ml: kcalMl,
            kcal: cans * (formulaData.kcal || 0),
            protein: cans * (formulaData.protein || 0),
            fat: cans * (formulaData.fat || 0),
            carbs: cans * (formulaData.carbs || 0),
            h2o: cans * (formulaData.h2o || 0),
            fiber: cans * (formulaData.fiber || 0),
            na: cans * (formulaData.na || 0),
            k: cans * (formulaData.k || 0),
            mg: cans * (formulaData.mg || 0),
            p: cans * (formulaData.p || 0),
            ca: cans * (formulaData.ca || 0),
            ref: formulaData.ref || null // Only uses ref if verified in spreadsheet
        };

        const summary = {
        name: formulaName,
        kcal_primary: breakdown.kcal || 0,
        kcal_modular: modularTotals.kcal || 0,
        kcal_propofol: propofolResults.kcal || 0,
        protein_primary: breakdown.protein || 0,
        protein_modular: modularTotals.proG || 0, 
        h2o_primary: breakdown.h2o || 0,
        h2o_modular_dissolve: modularTotals.water || 0, 
        h2o_modular_free: modularTotals.h2oMl || 0, 
    };
    
    allPrimaryResults.push({ breakdown, summary });
});

// --- Step 6: Finalize ---

const trackingInputs = {
    patientType: currentFormulaMode,
    energyNeeds: elements.energyNeeds.value,
    proteinNeeds: elements.proteinNeeds.value,
    fluidNeeds: elements.fluidNeeds.value,
    feedingGoal: elements.feedingGoalSlider.value,
    feedingPeriod: elements.feedingPeriod.value,
    propofolVolume: elements.propofolVolume.value,
    propofolDuration: elements.propofolDuration.value,
    primaryFormulas: [...selectedFormulas],
    modulars: Array.from(modularCards).map(card => ({
        name: card.dataset.modularName,
        amount: card.querySelector('.modular-amount').value,
        unit: card.querySelector('.modular-unit').value
    }))
};
metrics(trackingInputs);

displayBreakdown(allPrimaryResults, needs); 
displayPropofolBreakdown(propofolResults);
    displayModularBreakdown(modularResultsArray);
}


// --- 7. UI RENDERING FUNCTIONS ---

function initializeResultsUI() {
    const container = getElements().primaryBreakdownContainer;
    if (container) {
        displayBreakdown([], {}); 
        displayPropofolBreakdown(null); 
        displayModularBreakdown([]); 
    }
}

function createResultItem(label, value, unit, formatter = formatNum) { 
    const numValue = parseFloat(value);
    if (value === null || value === undefined || isNaN(numValue) || numValue === 0) return null;
    
    const card = document.createElement('div');
    card.className = "bg-gray-100 rounded-lg p-1.5 md:p-2 text-center shadow-sm";
    card.innerHTML = `
        <span class="text-xs md:text-sm font-medium text-gray-600">${label}</span>
        <p class="text-sm md:text-base font-bold text-gray-900">${formatter(numValue)} <span class="text-xs md:text-sm font-normal text-gray-700">${unit}</span></p>
    `;
    return card;
}

function appendValidItem(grid, label, value, unit, formatter = formatNum) { 
    const item = createResultItem(label, value, unit, formatter); 
    if (item instanceof Node) grid.appendChild(item);
}

function createSubHeader(title) {
    const header = document.createElement('h4');
    header.className = "text-md font-semibold text-gray-600 mt-4 mb-2 col-span-full";
    header.textContent = title;
    return header;
}

function createBreakdownHeader(title, refUrl) {
    let refBtn = '';
    if (refUrl) {
        refBtn = `<button onclick="window.open('${refUrl}', '_blank')" class="ml-auto px-2 py-0.5 text-xs bg-blue-100 text-blue-700 border border-blue-300 rounded hover:bg-blue-200 transition-colors">source</button>`;
    }
    return `<div class="flex items-center mb-3 col-span-full w-full">
                <h3 class="text-lg font-semibold text-blue-600">${title}</h3>
                ${refBtn}
            </div>`;
}

function displayBreakdown(allPrimaryResults, needs) {
    const container = getElements().primaryBreakdownContainer;
    container.innerHTML = ''; 

    if (!allPrimaryResults || allPrimaryResults.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center">Calculations for the primary formula(s) will appear here.</p>';
        return;
    }

    const safeNeeds = needs || { energy: 0, protein: 0, fluid: 0 };

    allPrimaryResults.forEach((result, index) => {
        const { breakdown, summary } = result;
        const card = document.createElement('div');
        card.className = "mb-6 p-4 border border-gray-200 rounded-lg";
        
        card.innerHTML = createBreakdownHeader(breakdown.name, breakdown.ref);

        const topCardsGrid = document.createElement('div');
        topCardsGrid.className = "grid grid-cols-3 gap-2 md:gap-3 mb-4";
        appendValidItem(topCardsGrid, 'Volume (mL)', breakdown.volume, ''); 
        appendValidItem(topCardsGrid, 'Rate (mL/hr)', breakdown.rate,  ''); 
        appendValidItem(topCardsGrid, 'Cans', breakdown.cans,  ''); 
        card.appendChild(topCardsGrid);

        const chartContainer = document.createElement('div');
        chartContainer.className = 'grid grid-cols-3 gap-2 md:gap-4 mb-6 p-4 bg-gray-50 rounded-lg';
        const ids = {
            kcal: `kcalChart-${index}`,
            protein: `proteinChart-${index}`,
            fluid: `fluidChart-${index}`
        };
        
        chartContainer.innerHTML = `
            <div class="text-center">
                <canvas id="${ids.kcal}"></canvas>
                <div id="kcalValueText-${index}" class="text-[10px] md:text-xs text-gray-500 mt-1"></div>
            </div>
            <div class="text-center">
                <canvas id="${ids.protein}"></canvas>
                <div id="proteinValueText-${index}" class="text-[10px] md:text-xs text-gray-500 mt-1"></div>
            </div>
            <div class="text-center">
                <canvas id="${ids.fluid}"></canvas>
                <div id="fluidValueText-${index}" class="text-[10px] md:text-xs text-gray-500 mt-1"></div>
            </div>
            <div class="col-span-full mt-4 flex justify-center items-center flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600">
                <div class="flex items-center"><span class="w-3 h-3 rounded-full mr-1.5" style="background-color: #60a5fa;"></span>Primary</div>
                <div class="flex items-center"><span class="w-3 h-3 rounded-full mr-1.5" style="background-color: #34d399;"></span>Modular</div>
                <div class="flex items-center"><span class="w-3 h-3 rounded-full mr-1.5" style="background-color: #f59e0b;"></span>Propofol</div>
            </div>
        `;
        card.appendChild(chartContainer);

        card.appendChild(createSubHeader('Macronutrients'));
        const macroGrid = document.createElement('div');
        macroGrid.className = "grid grid-cols-3 gap-2 md:gap-3";
        appendValidItem(macroGrid, 'Protein', breakdown.protein, 'g');
        appendValidItem(macroGrid, 'Fat', breakdown.fat, 'g');
        appendValidItem(macroGrid, 'Carbs', breakdown.carbs, 'g');
        card.appendChild(macroGrid);

        card.appendChild(createSubHeader('Micronutrients'));
        const microGrid = document.createElement('div');
        microGrid.className = "grid grid-cols-3 gap-2 md:gap-3";
        appendValidItem(microGrid, 'Na', breakdown.na, 'mg');
        appendValidItem(microGrid, 'K', breakdown.k, 'mg');
        appendValidItem(microGrid, 'Mg', breakdown.mg, 'mg');
        appendValidItem(microGrid, 'Phos', breakdown.p, 'mg');
        appendValidItem(microGrid, 'Ca', breakdown.ca, 'mg');
        appendValidItem(microGrid, 'Formula H2O', breakdown.h2o, 'mL');
        appendValidItem(microGrid, 'Fiber', breakdown.fiber, 'g');
        card.appendChild(microGrid);
        
        container.appendChild(card);

        setTimeout(() => {
            createComparisonChart(ids.kcal, 'Calories', summary, safeNeeds.energy, `kcalValueText-${index}`); 
            createComparisonChart(ids.protein, 'Protein', summary, safeNeeds.protein, `proteinValueText-${index}`); 
            createComparisonChart(ids.fluid, 'Fluids', summary, safeNeeds.fluid, `fluidValueText-${index}`); 
        }, 0);
    });
}

function displayPropofolBreakdown(result) {
    const elements = getElements();
    const container = elements.propofolBreakdownContainer;
    container.innerHTML = ''; 

    if (!result || result.kcal === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center">Propofol calculations will appear here.</p>';
        container.classList.add('hidden'); 
        elements.propofolChevron.classList.remove('rotate-180'); 
        return;
    }

    container.classList.remove('hidden');
    elements.propofolChevron.classList.add('rotate-180');

    const grid = document.createElement('div');
    grid.className = "grid grid-cols-2 md:grid-cols-3 gap-3";
    appendValidItem(grid, 'Total Kcal', result.kcal, 'kcal');
    appendValidItem(grid, 'Total Volume', result.volume, 'mL');
    container.appendChild(grid);
}

function displayModularBreakdown(modularsArray) {
    const elements = getElements();
    const container = elements.modularBreakdownContainer;
    container.innerHTML = ''; 

    if (modularsArray.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center">Modular formula calculations will appear here.</p>';
        container.classList.add('hidden'); 
        elements.modularChevron.classList.remove('rotate-180'); 
        return;
    }

    container.classList.remove('hidden');
    elements.modularChevron.classList.add('rotate-180');
    
    modularsArray.forEach(result => {
        const card = document.createElement('div');
        card.className = "mb-6 p-4 border border-gray-200 rounded-lg";
        card.innerHTML = `<h3 class="text-lg font-semibold text-blue-600 mb-3 col-span-full">${result.name}</h3>`;
        
        card.appendChild(createSubHeader('Macronutrients'));
        const macroGrid = document.createElement('div');
        macroGrid.className = "grid grid-cols-3 gap-2 md:gap-3"; 
        
        let displayUnitLabel = capitalizeUnit(result.displayUnit);
        appendValidItem(macroGrid, displayUnitLabel, result.displayAmount, '');
        appendValidItem(macroGrid, 'kcal', result.kcal, 'kcal');
        appendValidItem(macroGrid, 'Pro', result.proG, 'g');
        appendValidItem(macroGrid, 'Fat', result.fatG, 'g');
        appendValidItem(macroGrid, 'CHO', result.choG, 'g');
        appendValidItem(macroGrid, 'Dissolve in', result.water, 'mL');
        appendValidItem(macroGrid, 'H2O', result.h2oMl, 'mL');
        appendValidItem(macroGrid, 'Fiber', result.fiberG, 'g');
        appendValidItem(macroGrid, 'Glutamine', result.glutamineG, 'g');
        appendValidItem(macroGrid, 'L-Arginine', result.lArginineG, 'g');
        appendValidItem(macroGrid, 'MCT', result.mctG, 'g');
        appendValidItem(macroGrid, 'Osmolarity', result.osmolarity, 'mOsm/L');
        card.appendChild(macroGrid);

        card.appendChild(createSubHeader('Micronutrients'));
        const microGrid = document.createElement('div');
        microGrid.className = "grid grid-cols-3 gap-2 md:gap-3";
        appendValidItem(microGrid, 'Na', result.naMg, 'mg');
        appendValidItem(microGrid, 'K', result.kMg, 'mg');
        appendValidItem(microGrid, 'Mg', result.mgMg, 'mg');
        appendValidItem(microGrid, 'PO4', result.po4Mg, 'mg');
    appendValidItem(microGrid, 'Ca', result.caMg, 'mg');
    card.appendChild(microGrid);
    container.appendChild(card);
});
    }

    function metrics(data) {
console.log("Metrics Tracking - All Inputs:", data);

    }


// --- 9. CHARTING LOGIC (CHART.JS) ---

function createComparisonChart(canvasId, label, summary, goal, valueTextElementId) { 
    const ctx = document.getElementById(canvasId);
    const valueTextElement = document.getElementById(valueTextElementId); 
    
    if (!ctx || !valueTextElement) return;
    
    if (chartInstances[canvasId]) chartInstances[canvasId].destroy();

    let primary_val = 0, modular_val = 0, propofol_val = 0, unit = '';

    if (label === 'Calories') {
        primary_val = summary.kcal_primary;
        modular_val = summary.kcal_modular;
        propofol_val = summary.kcal_propofol;
        unit = 'kcal';
    } else if (label === 'Protein') {
        primary_val = summary.protein_primary;
        modular_val = summary.protein_modular; 
        unit = 'g';
    } else if (label === 'Fluids') {
        primary_val = summary.h2o_primary;
        modular_val = summary.h2o_modular_dissolve + summary.h2o_modular_free;
        unit = 'mL';
    }
    
    const total_provided = primary_val + modular_val + propofol_val;
    
    const primary_perc = (goal > 0) ? (primary_val / goal) * 100 : 0;
    const modular_perc = (goal > 0) ? (modular_val / goal) * 100 : 0;
    const propofol_perc = (goal > 0) ? (propofol_val / goal) * 100 : 0;
    const total_provided_perc = primary_perc + modular_perc + propofol_perc;
    const remaining_perc = Math.max(100 - total_provided_perc, 0); 
    
    valueTextElement.textContent = `${formatNum(total_provided)} / ${formatNum(goal)} ${unit}`;
    if (total_provided_perc > 110) valueTextElement.style.color = '#a16207'; 
    else if (total_provided_perc < 90) valueTextElement.style.color = '#3b82f6'; 
    else valueTextElement.style.color = '#6b7280'; 

    const data = {
        labels: ['Primary', 'Modular', 'Propofol', 'Remaining'],
        datasets: [{
            data: [primary_perc, modular_perc, propofol_perc, remaining_perc],
            backgroundColor: ['#60a5fa', '#34d399', '#f59e0b', 'transparent'],
            borderColor: ['#ffffff', '#ffffff', '#ffffff', 'transparent'],
            borderWidth: 2,
            cutout: '70%'
        }]
    };

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: { 
                    enabled: true,
                    filter: (item) => item.label !== 'Remaining',
                    callbacks: {
                        label: (ctx) => `${ctx.label}: ${formatNum(ctx.parsed)}%`
                    }
                },
            }
        },
        plugins: [{ 
            id: 'customDoughnutLabel',
            afterDraw: (chart) => {
                const { ctx, chartArea: { width, height, top, left } } = chart;
                ctx.save();
                
                const fontSizePercent = Math.max(10, width / 12); 
                const fontSizeLabel = Math.max(8, height / 18);
                const centerX = left + width / 2;
                const centerY = top + height / 2;

                ctx.font = `bold ${fontSizePercent}px "Inter", sans-serif`; 
                ctx.fillStyle = '#1f2937';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`${Math.round(total_provided_perc)}%`, centerX, centerY - (fontSizePercent / 2.5));

                ctx.font = `${fontSizeLabel}px "Inter", sans-serif`; 
                ctx.fillStyle = '#4b5563'; 
                ctx.fillText(label, centerX, centerY + (fontSizeLabel / 1.5));
                
                ctx.restore();
            }
        }]
    });
}
