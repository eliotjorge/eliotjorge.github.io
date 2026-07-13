// ======================================================
// Browser Notification Tester
// JorgeRosa.dev
// ======================================================

const statusNotification = document.getElementById("statusNotification");
const statusPermission = document.getElementById("statusPermission");
const statusSecure = document.getElementById("statusSecure");
const statusVisibility = document.getElementById("statusVisibility");
const statusBrowser = document.getElementById("statusBrowser");
const statusOS = document.getElementById("statusOS");

const btnPermission = document.getElementById("requestPermission");
const btnShow = document.getElementById("showNotification");
const btnClear = document.getElementById("clearLog");

const inputTitle = document.getElementById("title");
const inputMessage = document.getElementById("message");
const inputIcon = document.getElementById("icon");
const inputClose = document.getElementById("closeTime");

const log = document.getElementById("log");

//=======================================================
// LOG
//=======================================================

function writeLog(message, type = "info") {

    const now = new Date().toLocaleTimeString();

    const div = document.createElement("div");

    div.className = "log-entry";

    let css = "";

    switch (type) {

        case "success":
            css = "log-success";
            break;

        case "warning":
            css = "log-warning";
            break;

        case "error":
            css = "log-error";
            break;

    }

    div.innerHTML = `
        <span class="log-time">${now}</span>
        <span class="${css}">${message}</span>
    `;

    log.prepend(div);

}

//=======================================================
// STATUS COLORS
//=======================================================

function setStatus(element, text, type) {

    element.textContent = text;

    element.className = "";

    if (type)
        element.classList.add(type);

}

//=======================================================
// DETECT BROWSER
//=======================================================

function getBrowser() {

    const ua = navigator.userAgent;

    if (ua.includes("Edg"))
        return "Microsoft Edge";

    if (ua.includes("Firefox"))
        return "Firefox";

    if (ua.includes("Chrome"))
        return "Chrome";

    if (ua.includes("Safari"))
        return "Safari";

    return "Unknown";

}

//=======================================================
// DETECT OS
//=======================================================

function getOS() {

    const ua = navigator.userAgent;

    if (ua.includes("Windows"))
        return "Windows";

    if (ua.includes("Android"))
        return "Android";

    if (ua.includes("iPhone"))
        return "iPhone";

    if (ua.includes("iPad"))
        return "iPad";

    if (ua.includes("Mac"))
        return "macOS";

    if (ua.includes("Linux"))
        return "Linux";

    return "Unknown";

}

//=======================================================
// REFRESH STATUS
//=======================================================

function refreshStatus() {

    if ("Notification" in window) {

        setStatus(statusNotification, "Supported", "ok");

    } else {

        setStatus(statusNotification, "Not Supported", "error");

    }

    if (window.isSecureContext) {

        setStatus(statusSecure, "Yes", "ok");

    } else {

        setStatus(statusSecure, "No", "error");

    }

    if ("Notification" in window) {

        switch (Notification.permission) {

            case "granted":
                setStatus(statusPermission, "Granted", "ok");
                break;

            case "denied":
                setStatus(statusPermission, "Denied", "error");
                break;

            default:
                setStatus(statusPermission, "Default", "warning");

        }

    }

    if (document.visibilityState === "visible") {

        setStatus(statusVisibility, "Visible", "ok");

    } else {

        setStatus(statusVisibility, "Hidden", "warning");

    }

    statusBrowser.textContent = getBrowser();

    statusOS.textContent = getOS();

}

//=======================================================
// REQUEST PERMISSION
//=======================================================

btnPermission.addEventListener("click", async () => {

    if (!("Notification" in window)) {

        writeLog("Notification API not supported.", "error");

        return;

    }

    const permission = await Notification.requestPermission();

    writeLog(`Permission: ${permission}`, "success");

    refreshStatus();

});

//=======================================================
// SHOW NOTIFICATION
//=======================================================

btnShow.addEventListener("click", () => {

    if (!("Notification" in window)) {

        writeLog("Notifications are not supported.", "error");

        return;

    }

    if (Notification.permission !== "granted") {

        writeLog("Permission not granted.", "warning");

        return;

    }

    const notification = new Notification(inputTitle.value, {

        body: inputMessage.value,

        icon: inputIcon.value || undefined

    });

    writeLog("Notification created.");

    notification.onshow = () => {

        writeLog("onshow", "success");

    };

    notification.onclick = () => {

        writeLog("onclick", "success");

    };

    notification.onclose = () => {

        writeLog("onclose");

    };

    notification.onerror = () => {

        writeLog("onerror", "error");

    };

    const seconds = Number(inputClose.value);

    if (seconds > 0) {

        setTimeout(() => {

            notification.close();

        }, seconds * 1000);

    }

});

//=======================================================
// CLEAR LOG
//=======================================================

btnClear.addEventListener("click", () => {

    log.innerHTML = "";

});

//=======================================================
// VISIBILITY
//=======================================================

document.addEventListener("visibilitychange", () => {

    refreshStatus();

});

//=======================================================
// INIT
//=======================================================

refreshStatus();

writeLog("Browser Notification Tester ready.", "success");