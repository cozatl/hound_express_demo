//Import necessary Classes
import GuideItem from "./guideItem.js";

document.addEventListener('DOMContentLoaded', () => {
    console.log('script cargado en:',window.location.pathname);

//Declare variable from Class
const guideItem = new GuideItem();
const form = document.getElementById('newGuide');
const searchButton = document.getElementById('searchGuide');
const guideTable = document.getElementById('guideList');
if (guideTable) {
    // Get banner buttons
    const banner = document.getElementsByClassName("banner");
    const slideButtons = banner[0].querySelectorAll('button');

    // Added manual slide with javascript code
    slideButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Code to execute when a button is clicked
            // The 'event' object contains information about the click
            // The 'event.target' property refers to the specific button that was clicked
            switch (event.target.id) {
                case 'slideMinus':
                    plusDivs(-1);
                    break;
                case 'slidePlus':
                    plusDivs(1);
                    break;
            };
        });
    });

    var slideIndex = 1;
    showDivs(slideIndex);
    // Select next/previous slide
    function plusDivs(n) {
        showDivs(slideIndex += n);
    }
    // Get slide element from banner
    function showDivs(n) {
        var i;
        var x = document.getElementsByClassName("slides");
        if (n > x.length) {slideIndex = 1}
        if (n < 1) {slideIndex = x.length}
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";  
        }
        x[slideIndex-1].style.display = "block";  
    }

    const guideTbody = guideTable.tBodies[0]; 
    let tdStatus = guideTable.querySelectorAll("tr td:nth-child(6)"); //Select the field required based on the position
    let tableButtons = guideTable.querySelectorAll("button");         //Select buttons required from guide table
    let tableSelects = guideTable.querySelectorAll("select");         //Select buttons required from guide table
    const statusTable = document.getElementById('statusList');
    const tableCounter = statusTable.querySelectorAll("td"); 
    let parentTd = null;
    let parentTr = null;
    let currentSelect = null;
                
    let counter = {
        pending: 0,
        inProgress: 0,
        delivered: 0
    }
    searchButton.addEventListener('click', (e) => {
        // Prevent the default form submission
        // e.preventDefault();
        // guideItem.saveGuideList(guideTable);
    });

    
    guideItem.loadGuideList(guideTable);
    tdStatus = guideTable.querySelectorAll("tr td:nth-child(6)"); //Select the field required based on the position
    counter = guideItem.tdFieldUpdateAll(tdStatus, counter);
    guideItem.updateStatusTable(tableCounter, counter);
    //console.log(guideTbody);

    guideTbody.addEventListener('change', (e) => {
        if (e.target.classList.contains('input')){
            const selectedChange = e.target;
            parentTd = selectedChange.parentElement;
            parentTr = parentTd.parentElement;
            const currentButton = parentTr.querySelector('button');
            currentButton.disabled = false;
            currentButton.classList.remove('button--disabled');
            currentButton.classList.add('button');
            counter = guideItem.tdFieldUpdateAll(tdStatus, counter);
            guideItem.updateStatusTable(tableCounter, counter);    
        }
    });

    guideTbody.addEventListener('click', (e) => {
        if (e.target.classList.contains('button')){
            const clickedStatusBtn = e.target;
            const parentButton = clickedStatusBtn.parentElement;
            const currentRow = parentButton.parentElement;

            guideItem.saveHistRecords(currentRow);

            counter = guideItem.tdFieldUpdateAll(tdStatus, counter);
            guideItem.updateStatusTable(tableCounter, counter);

            clickedStatusBtn.disabled = true;
            clickedStatusBtn.classList.remove('button');
            clickedStatusBtn.classList.add('button--disabled');
            guideItem.saveGuideList(guideTable);
            guideItem.loadGuideList(guideTable);
            tdStatus = guideTable.querySelectorAll("tr td:nth-child(6)"); //Select the field required based on the position
            counter = guideItem.tdFieldUpdateAll(tdStatus, counter);
            guideItem.updateStatusTable(tableCounter, counter);
        }
        //Get the current cell clicked
        const clickedCell = e.target.closest('td'); // Find the closest ancestor that is a <td>
        if (clickedCell) {
            //Compare if clicked cell is the first row
            if (clickedCell.cellIndex === 0) {
                localStorage.setItem('currentGuideNr', clickedCell.textContent); //Save value to local Storage
            }
            
        }
    })

    form.addEventListener('submit', function(event) {
            // Prevent the default form submission
            event.preventDefault();

            // Get form data
            const formData = new FormData(form);            
            const error = guideItem.createItem(formData);
            if(!error) {
                tdStatus = guideTable.querySelectorAll("tr td:nth-child(6)"); //Select the field required based on the position
                counter = guideItem.tdFieldUpdateAll(tdStatus, counter);
                guideItem.updateStatusTable(tableCounter, counter);
            
                guideItem.saveHistRecords(undefined, formData);
            };       
            
            tableButtons = guideTable.querySelectorAll("button");         //Select buttons required from guide table
            tableSelects = guideTable.querySelectorAll("select");         //Select buttons required from guide table
            //console.log(guideTable);
            
            // You can then send this data to a server using Fetch API or XMLHttpRequest,
            // or store it locally using localStorage or sessionStorage.
            // Example: Storing in localStorage
            // localStorage.setItem('savedInput1', inputValue1);
            // localStorage.setItem('savedInput2', inputValue2);

            // Optionally, you can still submit the form programmatically if needed
            //form.submit();
        });
}

const historyTable = document.getElementById('historyList');
if (historyTable) {
    const currentGuideNr = localStorage.getItem('currentGuideNr');
    const histRows = historyTable.querySelectorAll("tr");

    guideItem.loadHistRecords(historyTable, currentGuideNr);
};
});