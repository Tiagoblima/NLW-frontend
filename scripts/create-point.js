
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
   
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
        console.log(states)
        for (const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()
function getCities(event) {
    const citiesSelect = document.querySelector("select[name=city]")
    const uf = event.target.value
    const stateInput = document.querySelector("input[name-state]")

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    citiesSelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citiesSelect.disabled = true
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
    .then(res => res.json())
    .then(cities => {
        console.log(cities)
        for (const city of cities){
            citiesSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
    })
    citiesSelect.disabled = false

}
document.querySelector("select[name=uf]").
                    addEventListener("change", getCities)



// Itens de coleta
// pegar todos os li

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (let item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}
const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []
function handleSelectedItem(event){
    const itemLi = event.target

    // add or remove classes from item 
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

    const alreadySelected = selectedItems.findIndex(item =>{
        const itemFound = item == itemId
        return itemFound
    })

    if (alreadySelected >=0){
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
    }else{
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems
}