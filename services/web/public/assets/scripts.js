window.onload = function () {

    let cards = document.querySelectorAll('.card')
    let modal

    function createModal() {
        let body = document.querySelector('body')
        let modal = document.createElement('div')
        modal.classList.add('card-modal')
        body.appendChild(modal)
        modal.addEventListener('click', hideModal)
        return modal
    }
    modal = createModal()

    function showModal() {

        hideModal()

        // empty modal:
        while (modal.firstChild) {
            modal.removeChild(modal.firstChild)
        }

        // fill modal:
        let title = this.querySelector('h1')
        if (title) {
            let titleHtml = document.createElement('h1')
            titleHtml.innerHTML = title.innerHTML
            modal.appendChild(titleHtml)
        }
        let description = this.querySelector('.description')
        if (description) {
            let descriptionHtml = document.createElement('div')
            descriptionHtml.innerHTML = description.innerHTML
            console.log(description)
            modal.appendChild(descriptionHtml)
        }

        // highlight active card:
        console.log(this)
        this.classList.add('card-is-active')

        // show modal:
        modal.classList.add('show-modal')

    }

    function hideModal() {
        modal.classList.remove('show-modal')
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.remove('card-is-active')
        }
    }

    function attachEventListeners (cards) {
        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener('click', showModal)
        }
    }
    attachEventListeners(cards)

}