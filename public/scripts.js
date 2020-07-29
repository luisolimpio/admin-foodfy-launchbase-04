const dishes = document.querySelectorAll('.dish')

for(let dish of dishes) {
    dish.addEventListener("click", function() {
    dish_id = dish.getAttribute("id")
    window.location.href = `/recipe/${dish_id}`
    })
}