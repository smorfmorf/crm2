// app.js
import "../css/index.css";

import "./module/datalist.js";
import "./module/loadImage.js";

//* экспорт через (export {initTable, cmsTotalPrce} )
//* импорт поумолчанию (export default formControl)

import { initTable, cmsTotalPrce } from "./module/table.js";

import { formControl } from "./module/modal.js";

//! Импортируйте все из модуля чекбокс
import "./module/checkbox.js";

export const CMS = {
  init: () => {
    initTable();
    cmsTotalPrce();
    formControl();
  },
};

CMS.init();
