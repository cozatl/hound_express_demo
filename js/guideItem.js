
export default class GuideItem {
    constructor() {
        
    }
    
    iterateTableCellsForOf(table) {
        //Under Development

        for (let row of table.rows) {
            for (let cell of row.cells) {
            }
        }
    }

    iterateTableCells(table) {
        //Under Development
        let tdFields = table.getElementsByTagName('td');
        const tdColumn = table.querySelectorAll("tr td:nth-child(1)"); //Select the field required based on the position
        tdColumn.forEach(cell => {
            //console.log(cell.textContent); // Get the text content of each cell
        });
        // for (let i = 0; i < tdFields.length; i++) {
        //     const element = tdFields[i]
        //     console.log(tdFields[i].textContent);
        // }
        // for (let row of table.rows) {
        //     console.log(row.cells[0]);
        // }
        return tdColumn;
    }

    newElements(guideItems, selectManually = false, selectItem = null) {
        //Create items which will be added to the Waybill List table
        const guideTemplate = {
            newRow: document.createElement("tr"),
            newGuideNr: document.createElement('td'),
            newGuideLink: document.createElement('a'),
            newSource: document.createElement('td'),
            newDestination: document.createElement('td'),
            newAddressee: document.createElement('td'),
            newCreationDate: document.createElement('td'),
            newTdSelect: document.createElement('td'),
            newSelect: document.createElement('select'),
            newTdButton: document.createElement('td'),
            newButton: document.createElement('button')
        };
        
        // newGuideNr.textContent = guideNr;
        guideTemplate.newSource.textContent = guideItems.source;
        guideTemplate.newDestination.textContent = guideItems.destination;
        guideTemplate.newAddressee.textContent = guideItems.addressee;
        guideTemplate.newCreationDate.textContent = guideItems.creationDate;
        guideTemplate.newButton.textContent = 'ENVIAR';
        guideTemplate.newGuideNr.appendChild(guideTemplate.newGuideLink);
        guideTemplate.newTdButton.appendChild(guideTemplate.newButton);
        guideTemplate.newTdSelect.appendChild(guideTemplate.newSelect);
        guideTemplate.newGuideLink.setAttribute('href', './waybill-history.html');
        guideTemplate.newGuideLink.textContent = guideItems.guideNr;

        if (selectManually){
            // Create options manually and assing to select item (not used for this project)
            const optionsData = [
                { value: '0', text: 'Status Envío' },
                { value: '1', text: 'Pendiente' },
                { value: '2', text: 'En tránsito' },
                { value: '3', text: 'Entregado' }
            ];

            optionsData.forEach(data => {
                const option = document.createElement('option');
                option.value = data.value;
                option.textContent = data.text;
                guideTemplate.newSelect.appendChild(option);
            });
            guideTemplate.newSelect.value = guideItems.status;
        } else {
            for (let i = 0; i < selectItem.options.length; i++) {
                const originalOption = selectItem.options[i];
                const newOption = document.createElement('option');
                newOption.value = originalOption.value;
                newOption.textContent = originalOption.textContent;
                guideTemplate.newSelect.appendChild(newOption);
            };
        };
        
        guideTemplate.newSource.classList.add('text');
        guideTemplate.newDestination.classList.add('text');
        guideTemplate.newAddressee.classList.add('text');
        guideTemplate.newCreationDate.classList.add('text');
        
        guideTemplate.newSelect.classList.add('input');
        guideTemplate.newButton.classList.add('button--disabled');
        
        guideTemplate.newRow.appendChild(guideTemplate.newGuideNr);
        guideTemplate.newRow.appendChild(guideTemplate.newSource);
        guideTemplate.newRow.appendChild(guideTemplate.newDestination);
        guideTemplate.newRow.appendChild(guideTemplate.newAddressee);
        guideTemplate.newRow.appendChild(guideTemplate.newCreationDate);
        guideTemplate.newRow.appendChild(guideTemplate.newTdSelect);
        guideTemplate.newRow.appendChild(guideTemplate.newTdButton);

        return guideTemplate;
    };

    newHistElements(guideItems) {
        //Create items which will be added to the Waybill List table
        const guideTemplate = {
            newRow: document.createElement("tr"),
            newGuideNr: document.createElement('td'),
            newCreationDate: document.createElement('td'),
            newStatus: document.createElement('td')
        };
        
        // newGuideNr.textContent = guideNr;
        guideTemplate.newGuideNr.textContent = guideItems.guideNr;
        guideTemplate.newCreationDate.textContent = guideItems.creationDate;
        guideTemplate.newStatus.textContent = guideItems.status;
        
        guideTemplate.newRow.appendChild(guideTemplate.newGuideNr);
        guideTemplate.newRow.appendChild(guideTemplate.newCreationDate);
        guideTemplate.newRow.appendChild(guideTemplate.newStatus);

        return guideTemplate;
    };

    createItem(formData) {

        let errorFound = false;
        // You can now access the data using formData.get('inputName')
        const guideItems = {
            guideNr: null,
            source: null,
            destination: null,
            addressee: null,
            creationDate: null,
            status: null
        }
        guideItems.guideNr = formData.get('guideNr');
        const guideNrElem = document.getElementById('guideNr');
        guideItems.source = formData.get('source');
        const sourceElem = document.getElementById('source');
        guideItems.destination = formData.get('destination');
        const destinationElem = document.getElementById('destination');
        guideItems.addressee = formData.get('addressee');
        const addresseeElem = document.getElementById('addressee');
        guideItems.creationDate = formData.get('creationDate');
        const cDateElem = document.getElementById('creationDate');
        guideItems.status = formData.get('status');
        const statusElem = document.getElementById('newStatus');
        const selectedValue = statusElem.value;   // Gets the value of the currently selected option

        // Example: Log the data to the console
        // console.log(guideNrElem);console.log(guideNr);
        // console.log(`source is: ${source}`);
        // console.log(`destination is: ${destination}`);
        // console.log(`addressee is: ${addressee}`);
        // console.log(`creation Date is: ${creationDate}`);
        // console.log(`status is: ${status}`);

        guideNrElem.classList.remove('invalid');
        const guideTable = document.getElementById('guideList');
        const tableBodies = guideTable.tBodies[0];
        const tdGuideNr = guideTable.querySelectorAll("tr td:nth-child(1)"); //Select the field required based on the position
        const tdStatus = guideTable.querySelectorAll("tr td:nth-child(6)"); //Select the field required based on the position
        

        const guideError = document.getElementById('guideError');
        guideError.textContent = '';
        const sourceError = document.getElementById('sourceError');
        sourceError.textContent = '';
        const destinationError = document.getElementById('destError');
        destinationError.textContent = '';
        const addresseeError = document.getElementById('addresseeError');
        addresseeError.textContent = '';
        const cDateError = document.getElementById('cDateError');
        cDateError.textContent = '';
        const statusError = document.getElementById('statusError');
        statusError.textContent = '';
        tdGuideNr.forEach(cell => {console.log(guideItems.status);
            if (cell.textContent === guideItems.guideNr) {
                guideError.textContent = 'Guide is already inserted.';
                guideNrElem.classList.add('invalid');
                errorFound = true;
            }
            else if (guideItems.guideNr === '') {
                guideError.textContent = 'The field can\'t be empty.';
                guideNrElem.classList.add('invalid');
                errorFound = true;
            };
        });

        if (guideItems.source === '') {
            sourceError.textContent = 'The field can\'t be empty.';
            sourceElem.classList.add('invalid');
            errorFound = true;
        };
        if (guideItems.destination === '') {
            destinationError.textContent = 'The field can\'t be empty.';
            destinationElem.classList.add('invalid');
            errorFound = true;
        };
        if (guideItems.addressee === '') {
            addresseeError.textContent = 'The field can\'t be empty.';
            addresseeElem.classList.add('invalid');
            errorFound = true;
        };
        if (guideItems.creationDate === '') {
            cDateError.textContent = 'The field can\'t be empty.';
            cDateElem.classList.add('invalid');
            errorFound = true;
        };
        if (guideItems.status === '' || guideItems.status === '0') {
            statusError.textContent = 'The field can\'t be empty.';
            statusElem.classList.add('invalid');
            errorFound = true;
        };
        if (errorFound) {
            return;
        };

        const guideTemplate = this.newElements(guideItems, false, statusElem);
        guideTemplate.newSelect.value = selectedValue; // Sets the new select's value to the one from the existing select

        // Append the new row to the table body
        tableBodies.appendChild(guideTemplate.newRow);
        
        this.saveGuideList(guideTable);
        this.loadGuideList(guideTable);
    };

    updateStatusTable (tableCounter, counter) {
        tableCounter[0].textContent = counter.pending;
        tableCounter[1].textContent = counter.inProgress;
        tableCounter[2].textContent = counter.delivered;
    };

    tdFieldUpdateAll(tdField, counter) {
        counter = {
            pending: 0,
            inProgress: 0,
            delivered: 0
        };
        tdField.forEach(cell => {
            const currentSelect = cell.querySelector('select');
            const selectedValue = parseInt(currentSelect.value); // Convert to number for comparison
            switch (selectedValue) {
                case 1:
                    counter.pending += 1;
                    break;
                case 2:
                    counter.inProgress += 1;
                    break;
                case 3:
                    counter.delivered += 1;
                    break;
            };
            for (let i = 0; i < currentSelect.options.length; i++) {
                const option = currentSelect.options[i];
                const optionValue = parseInt(option.value);
                if (optionValue < selectedValue) {
                    option.disabled = true;
                } else {
                    option.disabled = false;
                };
            };
        });
        return counter;
    };

    tdFieldUpdate(currentSelect) {
        currentSelect
        const selectedValue = parseInt(currentSelect.value); // Convert to number for comparison
        for (let i = 0; i < currentSelect.options.length; i++) {
            const option = currentSelect.options[i];
            const optionValue = parseInt(option.value);
            if (optionValue < selectedValue) {
                option.disabled = true;
            } else {
                option.disabled = false;
            };
        };
    };

    saveGuideList (guideTable) {
        const rows = [];
        //Get the records of every row in the guideList table
        guideTable.querySelectorAll('tbody tr').forEach(tr => {
            const cols = tr.querySelectorAll('.text');
            const tdGuideNr = tr.querySelector('a').textContent || '';
            const tdSource = cols[0].textContent || '';
            const tdDestination = cols[1].textContent || '';
            const tdAddressee = cols[2].textContent || '';
            const tdDate = cols[3].textContent || '';
            const select = tr.querySelector('select');
            rows.push({
                textGuideNr: tdGuideNr,
                textSource: tdSource,
                textDestination: tdDestination,
                textDate: tdDate,
                textAddressee: tdAddressee,
                option: select ? select.value : '',
            });            
        });
        //Save records in localStorage
        localStorage.setItem('guideTable', JSON.stringify(rows));
        
    };

    saveHistRecords (currentRow = null, formData = null) {
        let selectedText = '';
        const key = 'historicalTable';
        //Get data from localStorage
        let getRows = localStorage.getItem(key);
        //If no key is found, then create a new empty object array
        if(!getRows) {
            localStorage.setItem(key, JSON.stringify([]));
            getRows = '[]';
        };
        //Convert from JSON to an array
        let historicalRows = JSON.parse(getRows);

        //Save records when table is modified
        if (currentRow) {
            const cells = currentRow.cells;
            const select = cells[5].querySelector('select');
            switch (parseInt(select.value)) {
                case 1:
                    selectedText = 'Guide is pending to be sent.';
                    break;
                case 2:
                    selectedText = 'Guide has been sent, please keep tracking it.';
                    break;
                case 3:
                    selectedText = 'Guide was delivered successfully.';
                    break;
            };
            historicalRows.push({
                textGuideNr: cells[0].textContent,
                textCreationDate: cells[4].textContent,
                textStatus: selectedText
            });
        };
        //Save records when new record is added from the Form
        if (formData) {
            switch (parseInt(formData.get('status'))) {
                case 1:
                    selectedText = 'Guide is pending to be sent.';
                    break;
                case 2:
                    selectedText = 'Guide has been sent, please keep tracking it.';
                    break;
                case 3:
                    selectedText = 'Guide was delivered successfully.';
                    break;
            };
            historicalRows.push({
                textGuideNr: formData.get('guideNr'),
                textCreationDate: formData.get('creationDate'),
                textStatus: selectedText
            });
        };
        //Save records in localStorage
        localStorage.setItem(key, JSON.stringify(historicalRows));
    };

    loadGuideList (guideTable) {
        //Get records from localStorage
        const data = JSON.parse(localStorage.getItem('guideTable') || '[]');
        //Get rows from guideList table
        const tbody = guideTable.tBodies[0];
        //Build the object to store new values
        const guideItems = {
            guideNr: null,
            source: null,
            destination: null,
            addressee: null,
            creationDate: null,
            status: null
        };

        tbody.innerHTML = '';
        data.forEach(cols => {
            let index = 0;
            const tr = document.createElement('tr');
            for (let key in cols) {
                switch (key) {
                    case 'textGuideNr':
                        guideItems.guideNr = cols[key];
                        break;
                    case 'textSource':
                        guideItems.source = cols[key];
                        break;
                    case 'textDestination':
                        guideItems.destination = cols[key];
                        break;
                    case 'textDate':
                        guideItems.creationDate = cols[key];
                        break;
                    case 'textAddressee':
                        guideItems.addressee = cols[key];
                        break;
                    case 'option':
                        guideItems.status = cols[key];
                        break;
                };
            };
            //Create rows based on new values retrieved from localStorage
            const guideTemplate = this.newElements(guideItems, true);
            tbody.appendChild(guideTemplate.newRow);
        });
    };

    loadHistRecords (historicalTable, currentGuideNr) {
        //Get records from localStorage
        const data = JSON.parse(localStorage.getItem('historicalTable') || '[]');
        //Get rows from guideList table
        const tbody = historicalTable.tBodies[0];
        //Build the object to store new values
        const guideItems = {
            guideNr: null,
            creationDate: null,
            status: null
        };

        tbody.innerHTML = '';
        data.forEach(cols => {
            let guideFound = false;
            const tr = document.createElement('tr');
            for (let key in cols) {
                if (cols[key] === currentGuideNr) {
                    guideFound = true;
                };
                if (guideFound) {
                    switch (key) {
                        case 'textGuideNr':
                            guideItems.guideNr = cols[key];
                            break;
                        case 'textCreationDate':
                            guideItems.creationDate = cols[key];
                            break;
                        case 'textStatus':
                            guideItems.status = cols[key];
                            break;
                    };
                };
            };
            if (guideFound){
                //Create rows based on new values retrieved from localStorage
                const guideTemplate = this.newHistElements(guideItems);
                tbody.appendChild(guideTemplate.newRow);
                guideFound=false;
            };
        });
    };

}