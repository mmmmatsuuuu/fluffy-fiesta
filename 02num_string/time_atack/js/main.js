import { LoadPage } from "../../../js/modules/loader.js";
import { TimeCounter } from "../../../js/modules/time.js";
import { Question } from "../../../js/modules/question.js";

const URL = "https://script.google.com/macros/s/AKfycbx2h78LxrD8Am-cxWqIPnVhr0u9WjgtK4YTzkJ5C_5GRb5nZtYRRtnUEFxIhxuW3lChLw/exec?mode=tq";

let questions = [];

document.addEventListener("DOMContentLoaded", async function() {
    // 初期値
    const qBody = document.getElementById("q-body");
    
    // ロードページの表示と問題の読み込み
    const datas = await LoadPage(URL, qBody);
    questions = datas.datas;
    document.questions = questions;

    // タイマーの起動
    TimeCounter();

    // 解答処理
    Question(questions[0]);
});
