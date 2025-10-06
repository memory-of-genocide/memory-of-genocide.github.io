document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput')

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const searchTerm = this.value.toLowerCase()
      const cards = document.querySelectorAll('.card')
      let hasVisibleCards = false

      cards.forEach((card) => {
        const title = card.querySelector('h3').textContent.toLowerCase()
        const description = card.querySelector('p').textContent.toLowerCase()

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          card.style.display = 'block'
          hasVisibleCards = true
        } else {
          card.style.display = 'none'
        }
      })

      if (searchTerm && !hasVisibleCards) {
        showNoResultsMessage(true, searchTerm)
      } else {
        showNoResultsMessage(false, searchTerm)
      }

      if (!searchTerm) {
        showNoResultsMessage(false, searchTerm)
      }
    })
  }

  function showNoResultsMessage(show, searchTerm) {
    let messageElement = document.getElementById('noResultsMessage')

    if (show && searchTerm) {
      if (!messageElement) {
        messageElement = document.createElement('div')
        messageElement.id = 'noResultsMessage'
        messageElement.style.cssText = `
                    text-align: center;
                    padding: 30px;
                    background: #f8f9fa;
                    border-radius: 8px;
                    margin: 20px 0;
                    border-left: 4px solid #c62828;
                `
        messageElement.innerHTML = `
                    <h3 style="color: #c62828; margin-bottom: 10px;">Ничего не найдено!</h3>
                    <p style="color: #666;">Попробуйте изменить поисковый запрос или проверьте правильность написания.</p>
                `

        const container = searchInput.closest('section') || searchInput.parentElement
        container.appendChild(messageElement)
      } else {
        messageElement.style.display = 'block'
      }
    } else {
      if (messageElement) {
        messageElement.style.display = 'none'
      }
    }
  }
})
