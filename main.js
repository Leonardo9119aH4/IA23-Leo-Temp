const elQuiz = document.querySelector(".quiz")
const elPergunta = elQuiz.querySelector(".pergunta")
const elAlt = elQuiz.querySelector(".alternativas")
const elAc = elQuiz.querySelector("#acertos")
const elEr = elQuiz.querySelector("#erros")
const elHard = elQuiz.querySelector("#botao input")
const elAviso = document.querySelector('#aviso')
const RemAviso = elAviso.querySelector("button")

async function main() {
  const request = await fetch("quiz.json")
  const quiz = await request.json()

  let nP = 0
  let Er = 0
  let Ac = 0
  let tNP = 1

  elAviso.classList.add('escondido')

  function Perguntar(nPe) {
    tNP = nP + 1
    elPergunta.innerHTML = tNP + ". " + quiz[nPe].pergunta
    elAlt.innerHTML = ""
    quiz[nPe].alternativas.forEach(alt => elAlt.innerHTML += `<button>${alt}</button>`)
  }

  elAlt.addEventListener("click", ev => {
    const AltC = ev.target;
    const aAlt = [...elAlt.children]
    const nAltC = aAlt.indexOf(AltC)
    if(nP < quiz.length){
      if (nAltC == quiz[nP].resposta) {
        Perguntar(++nP)
        Ac++
      }
      else{
        Er++
        elAviso.style.display = "flex"
        if(elHard.checked){
          nP = 0
        }
      }
      elAc.innerHTML = "Acertos: " + Ac
      elEr.innerHTML = "Erros: " + Er
    }
    else{
      nP = 0
      Er = 0
      Ac = 0
      elAc.innerHTML = "Acertos: " + Ac
      elEr.innerHTML = "Erros: " + Er
    }
    RemAviso.addEventListener("click", rem =>{
      elAviso.style.display = "none"
    })
    Perguntar(nP)
  })
  Perguntar(0)
}
main()
