import { useState } from "react";
import "../eight.css";

const objectives = () => {
  return (
    <div className="objectives">
      <div class="table">
        <div class="row">
          <div class="cell">Viikko 1</div>
          <div class="cell">
            <li>Mittaa ruoka-annokset.</li>
            <li>Pudota painoa 3,3 kg (tavoite 3, actual 3.3).</li>
            <li>Pudota vyötärönmittaa 3 cm (actual 3).</li>
            <li>Aloita liikunta</li>
          </div>
        </div>

        <p></p>
        
        <div class = "row">
          <div class="cell">Viikko 2</div>
          <div class="cell">
            <li>Pudota painoa 2 kg.</li>
            <li>Pudota vyötärönmittaa 2 cm.</li>
            <li>3 krt viikossa liikuntaa.</li>
          </div>
        </div>

        <p></p>

        <div class = "row">
          <div class="cell">Viikko 3</div>
          <div class="cell">
            <li>Pudota painoa 1 kg.</li>
            <li>Pudota vyötärönmittaa 1 cm.</li>
            <li>3 krt viikossa liikuntaa.</li>
          </div>
        </div>

        <p></p>
        
        <div class = "row">
          <div class="cell">Viikko 4</div>
          <div class="cell">
            <li>Pudota painoa 1 kg.</li>
            <li>Pudota vyötärönmittaa 1 cm (mikäli näin niin vyötärönmitta 100 cm).</li>
            <li>3 krt viikossa liikuntaa.</li>
          </div>
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default objectives;
