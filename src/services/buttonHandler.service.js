export function buttonHandler(event) {
    const $el = event.target
    const id = $el.dataset.id
    const title = $el.dataset.title
    console.log('$el :', $el);

    if (id) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []
        const candidate = favorites.find(p => p.id === id)
        const equel = String($el.innerHTML) == 'Удалить';
        if (candidate) {
            // удалить элемент
            if (equel) {
                $el.textContent = 'Сохранить'
                $el.classList.add('button-primary')
                $el.classList.remove('button-danger')
                favorites = favorites.filter(p => p.id !== id)
            }
        } else {
            // добавить элемент
            $el.classList.remove('button-primary')
            $el.classList.add('button-danger')
            $el.textContent = 'Удалить'
            favorites.push({
                id,
                title
            })
        }

        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}