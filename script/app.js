// app.js

import { initTable, cmsTotalPrce } from "./module/table.js";
import { formControl } from "./module/modal.js";
import "./module/checkbox.js"; // Импортируйте модуль для работы с чекбоксом

export const CMS = {
  init: () => {
    initTable();
    cmsTotalPrce();
    formControl();
  },
};
