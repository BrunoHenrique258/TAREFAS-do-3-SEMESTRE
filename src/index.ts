import fs from "fs";
import Meteo from "./models/Meteo";

var meteo = Array<Meteo>();

var x: number = 0;

const data = fs
  .readFileSync("./src/Meteo.csv", { encoding: "utf8", flag: "r" })
  .toString()
  .split("\r\n");

data.forEach((linha) => {
  
  if (x > 0) {
    var l = linha.split(";");
    
    let ano: number = parseInt(l[0].substring(6, 10));
    let mes: number = parseInt(l[0].substring(3, 5)) - 1;
    let dia: number = parseInt(l[0].substring(0, 2));
    const m = new Meteo(
      new Date(ano, mes, dia),
      l[1],
      parseFloat(l[2].replace(",", ".")), 
      parseFloat(l[3].replace(",", ".")),
      parseFloat(l[4].replace(",", ".")),
      parseFloat(l[5].replace(",", ".")),
      parseFloat(l[6].replace(",", ".")),
      parseFloat(l[7].replace(",", ".")),
      parseFloat(l[8].replace(",", ".")),
      parseFloat(l[9].replace(",", ".")),
      parseFloat(l[10].replace(",", ".")),
      parseFloat(l[11].replace(",", ".")),
      parseFloat(l[12].replace(",", "."))
    ); 
    meteo.push(m); 
   
  }
  x++; 
}); 


let medias: Meteo[] = Array<Meteo>();
let dia: Date = meteo[0].Data;
let cont: number = 0;
x = 0;
let meteodia: Meteo = new Meteo(dia, "00:00", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

while (x < meteo.length) {
  while (true) {
    meteodia.Temp_C += meteo[x].Temp_C;
    meteodia.Hum += meteo[x].Hum;
    meteodia.Press_Bar += meteo[x].Press_Bar;
    meteodia.TempCabine_C += meteo[x].TempCabine_C;
    meteodia.Charge += meteo[x].Charge;
    meteodia.SR_Wm2 += meteo[x].SR_Wm2;
    meteodia.WindPeak_ms += meteo[x].WindPeak_ms;
    meteodia.WindSpeed_Inst += meteo[x].WindDir_Inst;
    meteodia.WindSpeed_Avg += meteo[x].WindSpeed_Avg;
    meteodia.WindDir_Inst += meteo[x].WindDir_Inst;
    meteodia.WindDir_Avg += meteo[x].WindDir_Avg;
    cont++;
    x++;
    if (x == meteo.length) {
      break;
    } else {
      if (dia.getTime() !== meteo[x].Data.getTime()) {
        break;
      }
    }
  }

  meteodia.Temp_C /= cont;
  meteodia.Hum /= cont;
  meteodia.Press_Bar /= cont;
  meteodia.TempCabine_C /= cont;
  meteodia.Charge /= cont;
  meteodia.SR_Wm2 /= cont;
  meteodia.WindPeak_ms /= cont;
  meteodia.WindSpeed_Inst /= cont;
  meteodia.WindSpeed_Avg /= cont;
  meteodia.WindDir_Inst /= cont;
  meteodia.WindDir_Avg /= cont;
  medias.push(meteodia);

  if (x < meteo.length) {
    dia = meteo[x].Data;
    cont = 0;
    meteodia = new Meteo(dia, "00:00", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}



function compare(a: Meteo, b: Meteo) {
  if (a.Temp_C > b.Temp_C) return -1;
  if (a.Temp_C < b.Temp_C) return 1;
  return 0;
}

medias.sort(compare);

var y = 0;
var ant = medias[0].Temp_C;
console.log("<< Exercício C >>\n");
for (x = 0; x < medias.length; x++) {
  console.log(
    "Dia:",
    medias[x].Data.toLocaleDateString("pt-BR"),
    "Temperatura Média: ",
    medias[x].Temp_C.toLocaleString("pt-BR", { maximumFractionDigits: 2 }),
    "°C"
  );
  if (ant != medias[x].Temp_C) {
    y++;
    ant = medias[x].Temp_C;
  }
  if (y == 5) {
    break;
  }
}


console.log("\n<< Exercício D >>\n");
let media: number = 0;
let mediaventos: number = 0;
let mediaumidade: number = 0;
medias.forEach((m) => {
  media += m.Temp_C;
  mediaventos += m.WindSpeed_Avg;
  mediaumidade += m.Hum;
});

media /= medias.length;
mediaventos /= medias.length;
mediaumidade /= medias.length;

console.log(
  "A média de todas as temperaturas é: ",
  media.toLocaleString("pt-BR", { maximumFractionDigits: 2 }),
  "°C"
);

console.log("\n<< Exercício E >>\n");

console.log(
  "A média das Médias das Velocidades dos Ventos é: ",
  mediaventos.toLocaleString("pt-BR", { maximumFractionDigits: 2 })
);



console.log("\n<< Exercício F >>\n");

function compare2(a: Meteo, b: Meteo) {
  if (a.Press_Bar > b.Press_Bar) return -1;
  if (a.Press_Bar < b.Press_Bar) return 1;
  return 0;
}

medias.sort(compare2);

var y = 0;
var ant = medias[0].Press_Bar;

for (x = 0; x < medias.length; x++) {
  console.log(
    y + 1 + "º",
    "Dia:",
    medias[x].Data.toLocaleDateString("pt-BR"),
    "Pressão Atmosférica Média: ",
    medias[x].Press_Bar.toLocaleString("pt-BR", { maximumFractionDigits: 2 }),
    "Pa"
  );
  if (ant != medias[x].Temp_C) {
    y++;
    ant = medias[x].Temp_C;
  }
  if (y == 3) {
    break;
  }
}


console.log("\n<< Exercício G >>\n");

console.log(
  "A média de totas as medições de Umidade Relativa do Ar é: ",
  mediaumidade.toLocaleString("pt-BR", { maximumFractionDigits: 2 }),
  "%"
);
