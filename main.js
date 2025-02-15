const { app, BrowserWindow } = require('electron'); 

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 700,  
    height: 600,
    webPreferences: {
      nodeIntegration: true, 
      contextIsolation: false, 
    },
  });
  mainWindow.loadFile('index.html'); 
}

app.whenReady().then(createWindow); 

// Cierra la app si todas las ventanas se cierran (excepto en macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { // 'darwin' = macOS
    app.quit();
  }
});

// En macOS, vuelve a abrir la ventana si la app se reactiva
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});