const { app, BrowserWindow } = require("electron");
const serve = require("electron-serve");
const path = require("path");

const appServe = app.isPackaged ? serve({
  directory: path.join(__dirname, "../out")
}) : null;

const createWindow = () => {
  const win = new BrowserWindow({
    frame: false,
    width: 1024,
    height: 600,
    webPreferences: {
      devTools: false,
      preload: path.join(__dirname, "preload.js")
    }
  });

//   if (app.isPackaged) {
//     appServe(win).then(() => {
//       win.loadURL("app://-");
//     });
//   } else {
//     win.loadURL("http://localhost:8000");
//     win.webContents.openDevTools();
//     win.webContents.on("did-fail-load", (e, code, desc) => {
//       win.webContents.reloadIgnoringCache();
//     });
//   }
    win.loadURL("http://localhost:8000");
    win.webContents.openDevTools({mode: 'right',activate: false});
    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
}

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});