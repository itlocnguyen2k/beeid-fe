import { isToday } from "date-fns";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { t } from "i18next";
import { finalize, map } from "rxjs";
import { toast } from "react-toastify";
import ToastInfo from "../components/toast/info/ToastInfo";

const swal = withReactContent(Swal);

export async function toggleSweetAlert(title, message, icon) {
  if (message === "Failed to fetch") {
    message = "Kết nối thất bại !";
  }
  return swal.fire({
    title: title || "Thông báo",
    text: message || "Đã có lỗi sảy ra vui lòng thử lại !",
    icon: icon || "error",
    customClass: {
      confirmButton: "btn btn-primary",
    },
    buttonsStyling: false,
  });
}

export async function toggleSweetConfirm(
  title,
  confirmButtonText,
  funCallback,
  hasInput = false,
  inputPlaceholder = "Vui lòng nhập tên cột muốn tạo",
  inputValue,
  objectId,
) {
  swal.fire({
    title: title,
    input: hasInput ? "text" : false,
    customClass: {
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-secondary ms-1",
    },
    inputValue: inputValue,
    inputPlaceholder: inputPlaceholder,
    buttonsStyling: false,
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    cancelButtonText: "Hủy",
    confirmButtonText: confirmButtonText,
    showLoaderOnConfirm: true,
    preConfirm(value) {
      if (value === inputValue) {
        return;
      }
      if (objectId) {
        funCallback(objectId, value);
      } else {
        funCallback(value);
      }
    },
  });
}

export const isObjEmpty = (obj) => Object.keys(obj).length === 0;

export function completePhotoPath(path) {
  if (path) {
    try {
      if (path.startsWith("http") || path.startsWith("blob") || path.startsWith("data:image")) {
        return path;
      } else {
        return process.env.REACT_APP_URL + path;
      }
    } catch (error) {
      return "";
    }
  } else {
    return "";
  }
}

export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value);
  let formatting = { month: "short", day: "numeric" };

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: "numeric", minute: "numeric" };
  }

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

export function filterArray(array, object, key) {
  const arr = JSON.parse(JSON.stringify(array));
  var index = arr.findIndex((o) => o[key] === object[key]);
  if (index === -1) arr.push(object);
  else arr.splice(index, 1);
  return arr;
}

export function initDataSelection(array, key) {
  return array.map((el) => ({ ...el, value: el._id, label: el[key] }));
}

export function completeFilePath(fileName) {
  if (fileName) {
    try {
      const fileNameTemp = fileName.split(".");
      const iconName = fileNameTemp[fileNameTemp.length - 1].toLowerCase();
      if (iconName === "docx") {
        return "word";
      } else if (iconName === "xlsx" || iconName === "csv") {
        return "excel";
      } else if (iconName === "pdf") {
        return "pdf";
      } else if (iconName === "pptx") {
        return "google-slides";
      } else {
        return "img";
      }
    } catch (error) {
      return "img";
    }
  } else {
    return "img";
  }
}
export function calculateTimeLeft(date) {
  const difference = +new Date(date) - +new Date();
  let timeLeft = {};
  if (difference > 0) {
    timeLeft = {
      hours: Math.floor(difference / (1000 * 60 * 60)) + " giờ ",
      minutes: Math.floor((difference / 1000 / 60) % 60) + " phút ",
      seconds: Math.floor((difference / 1000) % 60) + " giây",
    };
  }

  return timeLeft;
}

export function settingKeys(parameters, i) {
  const parameterTemp = {};
  for (const [key, value] of Object.entries(parameters)) {
    if (
      key === `categoryName${i}` ||
      key === `labelName${i}` ||
      key === `priorityName${i}` ||
      key === `templateName${i}` ||
      key === `color${i}`
    ) {
      const newKey = key.replace(/[0-9]/g, "");
      parameterTemp[newKey] = value;
    }
  }

  return parameterTemp;
}

export function downloadFile(blob, file) {
  const fileURL = window.URL.createObjectURL(new Blob([blob]));
  const fileLink = document.createElement("a");
  fileLink.href = fileURL;
  const fileName = file.fileName;
  fileLink.setAttribute("download", fileName);
  fileLink.setAttribute("target", "_blank");
  document.body.appendChild(fileLink);
  fileLink.click();
  fileLink.remove();
}

export function getResponseFromServerWithParameters(http, url, parameters) {
  return new Promise((resolve, reject) => {
    const s = http
      .post(url, parameters ? parameters : null)
      .pipe(
        map((response) => {
          if (response.code !== 200) {
            throw new Error(response.message || t("message.server_error"));
          }
          return response;
        }),
        finalize(() => {
          s.unsubscribe();
        }),
      )
      .subscribe({
        next: (response) => {
          s.unsubscribe();
          resolve(response);
        },
        error: (err) => {
          reject(err.message);
        },
      });
  });
}

export function getBlodFromServerWithParameters(http, url, parameters) {
  return new Promise((resolve, reject) => {
    const s = http
      .post(url, parameters ? parameters : null)
      .pipe(
        map((response) => {
          return response;
        }),
        finalize(() => {
          s.unsubscribe();
        }),
      )
      .subscribe({
        next: (response) => {
          s.unsubscribe();
          resolve(response);
        },
        error: (err) => {
          reject(err.message);
        },
      });
  });
}

export function addDay(date, days) {
  date.setDate(date.getDate() + days);
  return date;
}

export function getDates(startDate, stopDate) {
  const dateArray = [];
  let currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = addDay(currentDate, 1);
  }
  return dateArray;
}

export function filterCurrentDate(objectList) {
  const now = new Date();
  return objectList.filter((object) => new Date(object.time).getDate() === now.getDate());
}

export function calculateProgress(boardList) {
  let total = 0;
  let count = 0;
  if (boardList.length > 0) {
    boardList.forEach((board) => {
      const taskList = board.tasks;
      if (taskList.length > 0) {
        total = total + taskList.reduce((sum, { progress }) => sum + progress, 0);
        count = count + taskList.length;
      }
    });
    if (count > 0) {
      return (total / count).toFixed();
    } else {
      return 0;
    }
  } else {
    return 0;
  }
}

export function progressColorMapping(x) {
  let color = "success";
  switch (true) {
    case 0 <= x && x < 25:
      color = "danger";
      break;
    case 25 <= x && x < 50:
      color = "warning";
      break;
    case 50 <= x && x < 80:
      color = "info";
      break;
    default:
      color = "success";
  }
  return color;
}

export function notifyInfo(message) {
  toast(<ToastInfo message={message} />, { autoClose: 10000, hideProgressBar: false, theme: "colored" });
}
