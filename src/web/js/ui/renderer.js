import { elements } from "./elements.js";
import { getCurrentRequest } from "./state.js";

export function renderResponse(response) {
    const request = getCurrentRequest();
    const data = response.data;

    switch (request.command) {
        case "status":
            elements.todayDate.textContent = data.today.date;
            elements.todayDownload.textContent = data.today.download;
            elements.todayUpload.textContent = data.today.upload;
            elements.todayTotal.textContent = data.today.total;
            elements.statusSessionDownload.textContent = data.session.download;
            elements.statusSessionUpload.textContent = data.session.upload;
            elements.statusNotificationThreshold.textContent = data.notification.threshold;
            elements.statusNotificationEnabled.textContent = data.notification.enabled;
            break;

        case "usage":
            elements.ethernetDownload.textContent = data.ethernetDownload,
                elements.ethernetUpload.textContent = data.ethernetUpload,
                elements.ethernetUsage.textContent = data.ethernetUsage,
                elements.wifiDownload.textContent = data.wifiDownload,
                elements.wifiUpload.textContent = data.wifiUpload,
                elements.wifiUsage.textContent = data.wifiUsage,
                elements.usageTotalDownload.textContent = data.totalDownload,
                elements.usageTotalUpload.textContent = data.totalUpload,
                elements.usagetotal.textContent = data.totalUsage
            break;

        case "interface":
            elements.interfaceEthernetDownload.textContent = data.ethernetDownload,
                elements.interfaceEthernetUpload.textContent = data.ethernetUpload,
                elements.interfaceEthernetUsage.textContent = data.ethernetUsage,
                elements.interfaceWifiDownload.textContent = data.wifiDownload,
                elements.interfaceWifiUpload.textContent = data.wifiUpload,
                elements.interfaceWifiUsage.textContent = data.wifiUsage
            break;

        case "speed":
            const interfaces = Object.keys(data);

            for (const interfaceName of interfaces) {
                if (interfaceName.startsWith("w")) {
                    elements.speedWifiInterface.textContent = interfaceName;
                    elements.speedWifiDownload.textContent = data[interfaceName].download;
                    elements.speedWifiUpload.textContent = data[interfaceName].upload;
                }
                else if (interfaceName.startsWith("e")) {
                    elements.speedEthernetInterface.textContent = interfaceName
                    elements.speedEthernetDownload.textContent = data[interfaceName].download;
                    elements.speedEthernetUpload.textContent = data[interfaceName].upload;
                }
            }
            break;

        case "session":
            elements.sessionStartDate.textContent = data.startDate;
            elements.sessionDownload.textContent = data.download;
            elements.sessionUpload.textContent = data.upload;
            break;

        case "notification":
            elements.notificationToggleButton.value = data.enabled ? "enable" : "disable";
            elements.notificationToggleButton.textContent = data.enabled ? "Enable" : "Disable";
            elements.notificationThreshold.textContent = data.threshold;
            break;

        case "limit":
            if (request.subCommand === "get") {
                elements.limitAmount.textContent = data.limit;
                elements.limitStartDate.textContent = data.startDate;
                elements.limitEndDate.textContent = data.endDate;
                elements.limitUsed.textContent = data.usedGb;
                elements.limitRemaining.textContent = data.remaining;
                elements.limitPercentage.textContent = data.percentage;

                
            }
            elements.limitDaysAmount.value = "";
            elements.limitDateAmount.value = "";
            elements.limitDays.value = "";
            elements.limitFrom.value = "";
            elements.limitTo.value = "";
            break;

        default:
            console.error(`Unknown command: ${request.command}`);
    }

}