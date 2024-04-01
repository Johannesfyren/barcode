
const submitButton = document.querySelector("#submit-barcode");
const displayResult = document.querySelector("#barcode-mask-result");
const productNumber = document.querySelector("#product-number");
const barcodeTable = document.querySelector(".stregkode-tabel");
const test=  "TEST";




submitButton.addEventListener("click",()=>{ 
    const input = document.querySelector("#number-input").value;
    displayResult.textContent = `Maske:${getMask(input)}`;
    productNumber.textContent = `Varenummer:${displayProductNumber(input)}`;
    addRow(barcodeTable);
});

  
  
function getMask(string){
    let stringCount;
    let fill1DMask = "";
    let fill2DMask = "";
    let foundDate = false;
    let foundBatch = false;
    stringCount = string.length;
    
    if (stringCount == 13){ // Det er en 1D stregkode
        
        for (let i = 0; i<stringCount; i++){ // For loop til at fylde 1D stregkoden med maskeangivelser

        if (i<2){ // her udfylder vi præfix
            fill1DMask += string[i];
        } else if (i<6){ // de første fire x'er
            fill1DMask += 'x';
        } else if (i<12){ // varenummerets placering
            fill1DMask += 'v';
        } else fill1DMask += 'x';} //og resten af stregkoden
        return fill1DMask;
        }
        

    if (stringCount > 13){ //Det er en 2D stregkode

        for (let i = 0; i<stringCount; i++){ // For-loop til at erstatte scannet 2D-stregkoden med masketegn
        
        if (string[i-1]+string[i] == 17 && !foundDate && i>15){ // Hvis der i strengens står 17 et sted EFTER de første 15 karakterer skal vi se på dato
            fill2DMask = fill2DMask.slice(0, -1); //Fjerner lige det "x" som var for meget
            fill2DMask += "17yymmdd";
            i += 7; //spring over antal i stregkodesekvensen som "17yymmdd" svarer til
            foundDate = true; //Vi har nu fundet datoen, og behøver derfor ikke at komme tilbage i dette loop. 
        }


        if (string[i-1]+string[i] == 10 && !foundBatch && i>15){ // Hvis der i strengens står 17 et sted EFTER de første 15 karakterer skal vi se på dato
            fill2DMask = fill2DMask.slice(0, -1); //Fjerner lige det "x" som var for meget
            fill2DMask += "10"
            ++i; //Vi tæller det med vi sprang over
            foundBatch = true; //Vi har nu fundet batch, og behøver derfor ikke at komme tilbage i dette loop. 
        }

        
        if (i<2){ // her udfylder vi præfix
            fill2DMask += string[i];
            
        } else if (i<9){ // de første fire x'er
            fill2DMask += 'x';
        } else if (i<15){ // varenummerets placering
            fill2DMask += 'v';
        } else if (i > 15 && foundBatch){ //Hvis batch er fundet, så fylder vi bare resten med b'er
            fill2DMask += 'b';
        }else fill2DMask += 'x';} //og resten af stregkoden
        

        return fill2DMask;
    }
}
    
function displayProductNumber(barcode){
    return barcode.slice(9,15);
}

function addRow(tableID) {
    // Get a reference to the table
    let tableRef = tableID;
  
    // Insert a row at the end of the table
    let newRow = tableRef.insertRow(-1);
  
    // Insert a cell in the row at index 0
    let newCell = newRow.insertCell(0);
    let newCell2 = newRow.insertCell(1);
    let newCell3 = newRow.insertCell(2);
  
    // Append a text node to the cell
    let newText = document.createTextNode(document.querySelector("#number-input").value);
    let newText2 = document.createTextNode(displayResult.textContent.slice(6));
    let newText3 = document.createTextNode(productNumber.textContent.slice(11));
    newCell.appendChild(newText);
    newCell2.appendChild(newText2);
    newCell3.appendChild(newText3);
}