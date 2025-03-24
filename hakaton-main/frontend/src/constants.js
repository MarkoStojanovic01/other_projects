// Radne grupe:
export const radneGrupe = [{
    id: "logistika",
    title: "LOGISTIKA",
    text: "Ova grupa je zadužena za implementaciju i organizaciju svih aktivnosti unutar fakulteta, uključujući logističku podršku za šetnje i događaje. Osim toga, bavi se koordinacijom donacija – od prikupljanja i primopredaje novčanih sredstava do kontrolisanja troškova i optimizacije resursa.",
    img: "./src/assets/logistika.png",
},
{
    id: "motivacija",
    title: "MOTIVACIJA",
    text: "Grupa zadužena je za animiranje, motivisanje i aktivno uključivanje studenata u dešavanja na fakultetu. Njihova misija je podsticanje zajedništva kroz organizaciju predavanja, filmskih projekcija i drugih aktivnosti koje studentima omogućavaju da kvalitetno provode vreme na fakultetu i učestvuju u njegovoj blokadi. Takođe, ova grupa se bavi agitacijom, pravljenjem transparenata za proteste i podsticanjem svesti o važnosti studentskog aktivizma.",
    img: "./src/assets/motivacija.png",
},
{
    id: "bezbednost",
    title: "BEZBEDNOST",
    text: "Grupa za bezbednost brine o sigurnosti i nesmetanom odvijanju svih aktivnosti na fakultetu. Njihova odgovornost uključuje kontrolu ulaza, obezbeđivanje fakultetskih prostorija i održavanje reda tokom događaja i protesta. Kao redari, osiguravaju da sve aktivnosti proteknu bez incidenata, pružajući zaštitu studentima i učesnicima. Njihova disciplina, budnost i posvećenost garantuju bezbedno i organizovano okruženje za sve koji se bore za zajedničke ciljeve.",
    img: "./src/assets/bezbednost.png",
},
{
    id: "strategija",
    title: "STRATEGIJA",
    text: "Ova grupa predstavlja mozak organizacije, kreirajući dugoročne planove, ciljeve i pravce delovanja. Osmišljavaju efikasne javne akcije i taktike delovanja. Od planiranja većih protesta i logističke organizacije do kreiranja poruka i strategija mobilizacije – oblikuju tok studentskog pokreta. Njihova misija je da svaki korak bude promišljen, efektivan i usmeren ka ostvarenju ključnih ciljeva.",
    img: "./src/assets/strategija.png",
},
{
    id: "mediji",
    title: "MEDIJI",
    text: "Članovi grupe za medije se bave predstavljanjem ideja pokreta široj javnosti. Takođe, bave se dizajnom vizuelnog identiteta, vođenjem društvenih mreža, pisanjem saopštenja i kreiranjem promotivnog i infomativnog materijala. Njihov zadatak je da oblikuju imidž pokreta, informišu i inspirišu ljude.",
    img: "./src/assets/mediji.png",
},
{
    id: "komunikacije",
    title: "KOMUNIKACIJE",
    text: "Glavni cilj je komunikacija sa drugim fakultetima, univerzitetima, sindikatima, radnicima i interesnim grupama. Njeni članovi učestvuju u krovnim sastancima, vode diskusije i polemike, te održavaju kontakt sa ključnim akterima van fakulteta. Njihov zadatak je da prenose poruke, pregovaraju i koordiniraju zajedničke akcije, posebno u vezi sa protestima i širim društvenim inicijativama.",
    img: "./src/assets/komunikacija.png",
}];

// Kontakt Forma:
export const faculties = [
    "Elektrotehnički fakultet, Univerzitet u Beogradu",
    "Fakultet organizacionih nauka, Univerzitet u Beogradu",
    "Mašinski fakultet, Univerzitet u Beogradu",
    "Tehnološko-metalurški fakultet, Univerzitet u Beogradu",
    "Pravni fakultet, Univerzitet u Beogradu",
    "Ekonomski fakultet, Univerzitet u Beogradu"
]

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateName = (name) => {
    return (name === '' || name.split(" ").length < 2) ?
        "Neophodno je uneti ime i prezime!" : "";
}

export const validateFaculty = (faculty) => {
    return faculty === '' ? "Neophodno je odabrati fakultet!" : "";
}

export const validateEmail = (email) => {
    return (email === '' || !emailRegex.test(email)) ?
        "Uneti tekst ne zadovoljava email format!" : "";
}

export const validateRg = (rg1, rg2, rg3, rg4, rg5, rg6) => {
    return (rg1 === false && rg2 === false && rg3 === false && rg4 === false && rg5 === false && rg6 === false) ?
        "Neophodno je odabrati barem jednu radnu grupu!" : "";
}