const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow;

let win = BrowserWindow.getFocusedWindow();
let printers = win.webContents.getPrinters();
const indexDefaultPrinter = printers.findIndex(el => el.isDefault);
window.localStorage.setItem('printer_name', printers[indexDefaultPrinter].name)

let current = document.getElementById('current');
const options = {
  silent: true,
  printBackground: true,
  deviceName: window.localStorage.getItem('printer_name'),
  color: false,
  margin: {
    marginType: 'printableArea'
  },
  landscape: false,
  pagesPerSheet: 1,
  collate: false,
  copies: 1,
  header: 'Header of the Page',
  footer: 'Footer of the Page'
}

current.addEventListener('click', (event) => {
  win.webContents.print(options, (success, failureReason) => {
    if (!success) console.log(failureReason);

    console.log('Print Initiated');
  });
});