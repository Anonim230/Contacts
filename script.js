var { log } = console
var contact = [{
        name: "Anvarjon",
        number: "+998909166773",
        address: 'Toshkent'
    }],
    page = {
        isLogged: false
    },
    createButton = document.querySelector('#create_contact')
trHandler = event => {
    log(event.target)
}
trRemove = event => {
    contact.splice(contact.indexOf(contact.find(obj => obj[event.target.className])), 1)
    localStorage.setItem('contact', JSON.stringify(contact))
    event.target.parentNode.remove()
}
window.onload = () => {
    let parsed = JSON.parse(localStorage.getItem('contact'));
    // log(contact, parsed)
    if (parsed && parsed.length > 0) {
        contact = parsed
    } else {
        contact = []
    }
    writeTable()
}
writeTable = () => {
    body.innerHTML = ''
    let counted = 0
    count.innerHTML = counted
    contact.map(obj => {
        if (!obj.name || !obj.number) return false
        let tr = document.createElement('tr'),
            name = document.createElement('td'),
            number = document.createElement('td'),
            address = document.createElement('td')
        name.className = 'name'
        number.className = 'number'
        address.className = 'address'
        name.textContent = obj.name
        tr.appendChild(name)
        number.textContent = obj.number
        tr.appendChild(number)
        tr.onclick = trHandler;
        tr.ondblclick = trRemove;
        // if (obj.address) {
        address.textContent = obj.address
        tr.appendChild(address)
            // }
        body.appendChild(tr)
    })
}
createButton.onclick = event => {
    event.preventDefault()
    children = event.target.parentNode.children
    let name = children.name.value
    let number = children.number.value
    let address = children.address.value
    if (!name) return name.placeholder = "Enter name"
    if (!number || number.length < 7) return name.value = "Enter valid number"
    let miniContact = {
        name,
        number,
        date: new Date().toLocaleString()
    }
    if (address) miniContact.address = address
    contact.push(miniContact)
    children.name.value = ''
    children.number.value = ''
    children.address.value = ''
    localStorage.setItem('contact', JSON.stringify(contact))
    writeTable()
}