
const themeOne = document.getElementById('theme-one')
const themeTwo = document.getElementById('theme-two')
const themeThree = document.getElementById('theme-three')

themeOne.addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', 'theme-one')
})
themeTwo.addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', 'theme-two')
})
themeThree.addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', 'theme-three')
})